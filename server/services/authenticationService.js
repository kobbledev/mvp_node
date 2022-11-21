const redis = require("redis");
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});
var async = require("async");
const jwt = require("jsonwebtoken");
const isEmpty = require("lodash.isempty");

/**
 * This method is used for creating the session
 * @param {*} req 
 */
exports.saveSession = async (req) => {
  try {
    req.session.key = {
      accessToken: req.body.accessToken,
      username: req.body.username,
      userId: req.body.userId,
    };
    console.log("Session id : " + req.session.id)
    return {
      sessionId: req.session.id,
      key: req.session.key,
      session: req.session
    };
  } catch (error) {
    console.log("saveSession error :" + error);
    return null;
  }
}

/**
* Delete the session  if already logged in
* @param {*} userName 
* @returns 
*/
exports.checkIfUserAlreadyLoggedIn = async (username) => {
  return await new Promise((resolve, reject) => {
    redisClient.keys("*", function (err, keys) {
      let userkeys = [];
      if (keys.length) {
        let count = 0;
        async.map(
          keys,
          function (key, cb) {
            redisClient.get(key, function (error, value) {
              count += 1;
              if (error) return cb(error);
              if (value) {
                const dataValue = JSON.parse(value);
                if (dataValue.key && dataValue.key.username === username) {
                  redisClient.del(key, (err, reply) => {
                    console.log("Cleared sessions +++++++++++++++ " + err + " : reply  " + reply);
                  });
                  userkeys.push(dataValue);
                }
              }
              if (count === keys.length) {
                resolve(userkeys);
              }
            });
          },
          function (error, results) {
            if (error) return console.log(error);
          }
        );
      } else {
        resolve(userkeys);
      }
    });
  });
};


/**
 * Validating the header session
 * @param {*} req
 * @param {*} res
 */
exports.validateHeaderSessionToken = async (req, res, next) => {
  try {
    let sessionKey;
    let webSessionId = req.headers["sessionid"] ? req.headers["sessionid"] : null;
    if (webSessionId) {
      sessionKey = `sess:${webSessionId}`;
    }
    const logSource = req.headers["logsource"] ? req.headers["logsource"] : "Web";

    // Fetch Session Redis data
    let token = req.headers["accesstoken"] ? req.headers["accesstoken"] : "";
    if(isEmpty(token)){
      return res.sendStatus(401);
    }
    let redisData = await this.getRedisData(sessionKey);
    if (redisData === null) {
      console.log("validateHeaderSessionToken call redis data null for " + sessionKey + "   URL: " + req.headers.originurl + "  Method: " + req.headers.originmethod + " " + logSource);
      return res.sendStatus(401);
    } else {
      req.session.key = {
        accessToken: redisData.key.accessToken,
        username: redisData.key.username,
      };
      const accessToken = redisData.key.accessToken ? redisData.key.accessToken : null;
      if (accessToken == null) {
        return res.sendStatus(401);
      }
      // Fetch logged in user data
      let user = await this.getRedisUser(token);
      if (user === null) {
        console.log("authe verfy jwt failed new");
        return res.sendStatus(401);
      }
      req.user ={_id:user.data._id}
      next();
    }
  } catch (err) {
    console.log("error :" + err);
    return res.status(401).json({ success: false, data: "Authentication Failed" });
  }
};

/**
 * 
 * @param {*} sessionKey 
 * @returns 
 */
exports.getRedisData = async (sessionKey) => {
  try {
    return await new Promise((resolve, reject) => {
      redisClient.get(sessionKey, async (err, data) => {
        if (err || data == null) {
          console.log(sessionKey + " getRedisData erros " + err);
          resolve(data)
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  } catch (error) {
    console.log("getRedisData error :" + error);
    return null;
  }
}

/**
 * 
 * @param {*} headerToken 
 * @returns 
 */
exports.getRedisUser = async (headerToken) => {
  try {
    return await new Promise((resolve, reject) => {
      jwt.verify(headerToken, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
          console.log("authe verfy jwt failed ");
          resolve(null);
        }
        resolve(user);
      });
    });
  } catch (error) {
    console.log("getRedisUser error :" + error);
    return null;
  }
}

exports.generateJWTToken = async (user, expiresIn, logSource) => {
  try {
    const jwtToken = jwt.sign(
      { data: user },
      process.env.ACCESS_TOKEN,
      { expiresIn: expiresIn }
    );
    return jwtToken;
  } catch (err) {
    return null;
  }
};


