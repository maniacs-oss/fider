import { get, post, Result } from '@fider/services/http';
import { injectable } from '@fider/di';
import { Tenant } from '@fider/models';

export interface TenantService {
    create(token?: string, name?: string, subdomain?: string): Promise<Result>;
    checkAvailability(subdomain: string): Promise<Result<CheckAvailabilityResponse>>;
}

export interface CheckAvailabilityResponse {
    message: string;
}

@injectable()
export class HttpTenantService implements TenantService {
    public async create(token?: string, name?: string, subdomain?: string): Promise<Result> {
        return await post('/api/tenants', {
            token, name, subdomain,
        });
    }

    public async checkAvailability(subdomain: string): Promise<Result<CheckAvailabilityResponse>> {
        return await get<CheckAvailabilityResponse>(`/api/tenants/${subdomain}/availability`);
    }
}
