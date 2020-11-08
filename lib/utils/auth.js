const jwt = require('jsonwebtoken');
const secret = process.env.DB_SECRET;

const createToken = (data) =>{

    return jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: '1h'});
}

const getMensajes = (req, res, next) => {

    let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
  
  // Si existe algún valor para el token, se analiza
  // de lo contrario, un mensaje de error es retornado
  if( token ) {

    // Si el token incluye el prefijo 'Bearer ', este debe ser removido
        // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
        jwt.verify( token, secret, ( err, decoded ) => {
      
        // Si no pasa la validación, un mensaje de error es retornado
        // de lo contrario, permite a la solicitud continuar
        if( err ) {
          return res.json( {
            success: false,
            message: 'Token is not valid'
          } );
        } else {
            req.decoded = decoded;
            if (decoded.role === "admin" || decoded.role === "lider") {
                next();
            }
            else {
                return res.json( {
                    success: false,
                    message: 'You dont have permisions'
                  } );
            }
        }
      } );
    
  } else {
    
    return res.json( {
      success: false,
      message: 'Auth token is not supplied'
    } );

  }
}

exports.getMsgs = getMensajes;
exports.createToken = createToken;