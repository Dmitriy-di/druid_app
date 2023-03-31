import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from "@apollo/client/link/context";

export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
	const httpLink = createHttpLink({
		// uri: "https://firm-dassie-25.hasura.app/v1/graphql",
		uri: "https://app.dev.druid.1t.ru/graphql",
	})

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		// const token = sessionStorage.getItem("token");
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				// Authorization: token ? `Bearer ${token}` : "",
				Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiNmU5ZmEzODAzODI4YjE4ZjFjYTIzYmIxNDY2YzI1ZWUwZTE2ODVmZDllZmNjOGQwMzk1ZTQ1NDFmMzhhMzA4NmI4OGZhNDgzMGE0MDEyMGEiLCJpYXQiOjE2ODAyMDI1ODAuMjc1NDU5LCJuYmYiOjE2ODAyMDI1ODAuMjc1NDYxLCJleHAiOjE3MTE4MjQ5ODAuMjY3Mjk1LCJzdWIiOiI1OTcyMDg2NDY0MTY0Njk1MDkzIiwic2NvcGVzIjpbXX0.POMcll2ADVgqwCSBeOhvgUe5YPzisfHDAJaK5hYopkp5a7rV7kw0zsqNc0fH25Ol5AXiHxCe5XFgHQvAb7UGovTtfpLbrrCUfG90Y81-TCCAsd7yU7hw3FtEBgf6MfBUfFYSCgLFyaxOfyFKq9N5TmqPGI1uxaR21Q51gGCA5jnzI-t9WeTfmMu1oEh1l74tDZ9OKIWuuG-76nNgEOl-ky0JdL7m7gYgLBx8muCR7L3p2ZvQUbzZJloSeWLlsHkENPX2Tr5k2pc_KpDCwngEgBP4xR43mbR0Mw06YoYY2vLztA-1DtnzcVwBMu6MMaNj-u1Tu_ZEpvs8YOzHNE5ocRxso0_unB__kgEXzzw2eacnJK7XnCK4AXJf0bEYLlZykHh6pU_O7ydKs1dZrfQmPGLS8NFIntIrMdypCXJfNGLVZSlWzDiaEzGnWnSJUtaUUxkjXMGx7DTfIHcA7ju8ePdVFGTKOS8pfEgNhfR6VA7EidnWKvQL68HliivdgTZrEUwZVvHVa_BKT-XJS3LkrTKuI-JL87CybFwi4OdpiPxcjZcVKqPrHCsDEiI8qf9ut9uqAPOLCQCeZ3xcl7Td8hIJ3Hopum02NGFRy1iTXMzxYEXRJV_LBK8aE0aMQcHKLTbG24YLgJS8w_FuL7_kmP3-YnIEnMpPJbQQLRpaVHQ&space=727
				`,
			}
		}
	})

	return Object.assign(
		{
			link: authLink.concat(httpLink),
			cache: new InMemoryCache(),
		},
		process.env.MODE === 'spa'
			? {
				//
			}
			: {},
		process.env.MODE === 'ssr'
			? {
				//
			}
			: {},
		process.env.MODE === 'pwa'
			? {
				//
			}
			: {},
		process.env.MODE === 'bex'
			? {
				//
			}
			: {},
		process.env.MODE === 'cordova'
			? {
				//
			}
			: {},
		process.env.MODE === 'capacitor'
			? {
				//
			}
			: {},
		process.env.MODE === 'electron'
			? {
				//
			}
			: {},
		// dev/prod options.
		process.env.DEV
			? {
				//
			}
			: {},
		process.env.PROD
			? {
				//
			}
			: {},
		// For ssr mode, when on server.
		process.env.MODE === 'ssr' && process.env.SERVER
			? {
				ssrMode: true,
			}
			: {},
		// For ssr mode, when on client.
		process.env.MODE === 'ssr' && process.env.CLIENT
			? {
				ssrForceFetchDelay: 100,
			}
			: {}
	)
}
