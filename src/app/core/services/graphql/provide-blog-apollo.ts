import { inject } from '@angular/core';
import { provideApollo, provideNamedApollo } from 'apollo-angular';
import { provideHttpClient } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';

import { cmsEnv } from '../../../../environments/env.prod';

export const provideBlogApollo = () => [
    provideHttpClient(),
    // provideApollo(() => {
    //     const httpLink = inject(HttpLink);

    //     const authLink = setContext((_, { headers }) => {
    //         return {
    //             headers: {
    //                 ...headers,
    //                 Authorization: `Bearer ${cmsEnv.token}`,
    //             },
    //         };
    //     });

    //     return {
    //         cache: new InMemoryCache(),
    //         link: ApolloLink.from([
    //             authLink,
    //             httpLink.create({ uri: cmsEnv.hygraphApi })
    //         ]),
    //     };
    // }),
    // Default client - Content API
    provideApollo(() => {
        const httpLink = inject(HttpLink);

        const authLink = setContext((_, { headers }) => ({
            headers: {
                ...headers,
                Authorization: `Bearer ${cmsEnv.token}`,
            }
        }));

        return {
            cache: new InMemoryCache(),
            link: ApolloLink.from([authLink, httpLink.create({ uri: cmsEnv.contentApi })])
        };
    }),

    // Named client - Management API
    provideNamedApollo(() => ({
        management: {
            cache: new InMemoryCache(),
            link: ApolloLink.from([
                setContext((_, { headers }) => ({
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${cmsEnv.token}`,
                    },
                })),
                inject(HttpLink).create({ uri: cmsEnv.managementApi }),
            ]),
        }
    }))

];
