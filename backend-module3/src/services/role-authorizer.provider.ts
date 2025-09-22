import {Provider, inject} from '@loopback/core';
import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';
import {AclRepository} from '../repositories/acl.repository';

export class RoleAuthorizerProvider implements Provider<Authorizer> {
  constructor(
    @inject('repositories.AclRepository')
    private aclRepo: AclRepository,
  ) {}

  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ): Promise<AuthorizationDecision> {
    const user = authorizationCtx.principals[0];
    const role = user?.role;

    if (!role) return AuthorizationDecision.DENY;

    const resource = metadata.resource ?? '';
    const property = metadata.scopes?.[0] ?? '*';

    console.log('DEBUG: Role:', role, 'Resource:', resource, 'Property:', property);

    const aclEntry = await this.aclRepo.findOne({
      where: {
        principalid: role,
        resource: resource,
        permission: 'ALLOW',
        or: [
          {property},    // exact match
          {property: '*'} // wildcard match
        ],
      },
    });

    console.log('DEBUG: ACL Entry Found:', aclEntry);

    return aclEntry ? AuthorizationDecision.ALLOW : AuthorizationDecision.DENY;
  }
}
