import * as newman from 'newman';
import { ENVIRONMENT } from '../data/globalData';
import logger from '../support/logger';

// collection_file path imported from postman
const collection_Path = 'src/data/collections/PFW_V2_Collection_GET_CALL.postman_collection.json';
let environment_Path: string;

// environment_Path is path for environemnt.json file imported from postman
switch(ENVIRONMENT){
    case 'dev': {
        environment_Path = 'src/data/environments/Dev.postman_environment.json';
        break;
    }
    case 'qa': {
        environment_Path = 'src/data/environments/---.json';
        break;
    }
    case 'prod': {
        environment_Path = 'src/data/environments/Live.postman_environment.json';
        break;
    }
    case 'local': {
        environment_Path = 'src/data/environments/Local.postman_environment.json';
        break;
    }
    default: {
        environment_Path = 'src/data/environments/Local.postman_environment.json'
    }
}
// IIFE function will get executed automatically no need to call it explicitly
(
     () => {
        newman.run({
            collection: collection_Path,
            environment: environment_Path,
            reporters: 'cli',
            insecure: true,
        }).on('start',  (err, args) =>{
            if(err || args.error){
                throw new Error(err);
            }
            else{
                logger.info('API testing started')
            }
        }).on('end',  (err, summary) => {
            if(err){
                throw new Error(err);
            }
            else{
                logger.info('collection ran successfully!');
            }
        })
    }
)();
