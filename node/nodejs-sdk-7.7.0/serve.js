var qiniu = require("qiniu");

let accessKey = 'A_WTyjjN3Hx-JkYbi-eKEhj2UQxFRb-Txfxgv36R';
let secretKey = 'ymg3fZ8YfUNTUo-u3zAijwZNBiOVIJA7hMv7epQl';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
