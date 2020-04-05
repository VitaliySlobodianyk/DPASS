
const post = require('request');
const crypto = require('crypto');

const { createHash } = crypto;


const publicKey = 'sandbox_i75325465435'; //TEST
const privateKey = 'sandbox_SV9Ubpj8Aj12FbBdgT4fS4Walhd6ety1wwcZAitj'; //TEST
const path = 'https://www.liqpay.ua/api/3/checkout ';

const payment = (amount) => {

    const details = {
        public_key: publicKey,
        private_key: privateKey,
        version : 3,
        action: "pay",
        amount: amount,
        currency: "UAH",
        description: "test",
        order_id: "000001",
        commission_payer: "sender"
    }

    api(details, (data) => console.log(data), (err) => console.log(err));
}



const api = function (params, callback, callbackerr) {

    if (!params.version)
        throw new Error('version is null');

    params.public_key = publicKey;
    var data = new Buffer(JSON.stringify(params)).toString('base64');
    var signature = str_to_sign(privateKey + data + privateKey);

    post( this.host + path, { data: data, signature: signature }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body)
        } else {
            callbackerr(error, response);
        }
    }
    );
};


const str_to_sign = function (str) {
    var sha1 = createHash('sha1');
    sha1.update(str);
    return sha1.digest('base64');
};

const sendData = async (order) => {
    fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })
        .then(response => console.log(response)).catch(err => {
            console.log(err)

        });

}

payment(1);


