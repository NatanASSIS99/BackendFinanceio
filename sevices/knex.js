let conn;

const knexService = () =>{

    if(!conn) {
        conn = ''; //doto connet to database
    }
        return conn
} ;

export default knexService;