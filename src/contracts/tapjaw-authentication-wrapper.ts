
/**
 * This wrapper interface is used to allow the updating
 * of request options (such as headers, URI, query arguments etc)
 * based on the outcome from a TapjawAuthenticator.
 */
export default interface TapjawAuthenticationWrapper {
    authenticate(requestOptionContainer: any): Promise<any>;
}
