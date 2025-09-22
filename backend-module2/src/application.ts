import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';

import {RoleAuthorizerProvider} from './services/role-authorizer.provider';
import {AuthorizationComponent, AuthorizationTags} from '@loopback/authorization';
import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {JWTAuthenticationStrategy} from './services/jwt-strategy';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {JwtService} from './services/jwt.service';

export {ApplicationConfig} from '@loopback/core';

export class BackendModule2Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Bind JWT service first
    this.bind('services.JwtService').toClass(JwtService);

    // Authentication
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Authorization
    this.component(AuthorizationComponent);
    this.bind('authorizationProviders.role-authorizer')
      .toProvider(RoleAuthorizerProvider)
      .tag(AuthorizationTags.AUTHORIZER);


    // Serve static files
    this.static('/', path.join(__dirname, '../public'));

    // API Explorer
    this.configure(RestExplorerBindings.COMPONENT).to({path: '/explorer'});
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
  }
}
