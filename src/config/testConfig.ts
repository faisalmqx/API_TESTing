import * as newman from 'newman';
import { ENVIRONMENT } from '../data/globalData';
import logger from '../support/logger';
import path from 'path';
// collection_file path imported from postman
// const collection_Path = 'src/data/collections/newman-test-sample.postman_collection.json';
const collection_Path = 'src/data/collections/PFW_V2_Collection_GET_CALL.postman_collection.json';
// const collection_Path = 'src/data/collections/PFW_V2 Tests.postman_collection.json';
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

const reportsDirectory = path.join(__dirname, '../reports');
// IIFE function will get executed automatically no need to call it explicitly
(
     () => {
        newman.run({
            collection: collection_Path,
            environment: environment_Path,
            reporters: ['cli','json','htmlextra'],
            reporter: {
                htmlextra: {
                     export: 'src/reports/report.html',
                },
                json: {
                    export: 'src/reports/newman-report.json'// Specify the file to which the JSON report will be written
                }
            },
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
            else {
                if (summary.run.failures.length > 0) {
                    logger.error('There were test failures.');
                    // Here you can handle the failures as needed, for example:
                    // Write a summary of failures to a file, send a notification, etc.
                } else {
                    logger.info('All tests passed!');
                }
            }
        })
    }
)();
