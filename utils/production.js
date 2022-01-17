import helmet from 'helmet';
import compression from 'compression';

export default function(app) {
    //helmet secures http headers
    app.use(helmet());
    
    //compression decreases the downloadable amount of data that is served to users 
    app.use(compression());
}