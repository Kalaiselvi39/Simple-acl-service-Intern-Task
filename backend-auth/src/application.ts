import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { AuthService } from './services/jwt.service';
export {ApplicationConfig};

import { UserRepository } from './repositories';
import { PostgresDataSource } from './datasources/postgres.datasource';

export class BackendAuthApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;

    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
  controllers: {
    dirs: ['controllers'],
    extensions: ['.controller.js'],
    nested: true,
  },
  repositories: {
    dirs: ['repositories'],
    extensions: ['.repository.js'],   
    nested: true,
  },
};


    this.repository(UserRepository);
    this.bind('services.AuthService').toClass(AuthService);
    this.dataSource(PostgresDataSource, 'postgres');

  }
}
