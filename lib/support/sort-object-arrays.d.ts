declare type Payload = {
    [key: string]: any;
};
/**
 * This support method is used to prevent TapjawMessage
 * signatures incorrectly changing between API responses.
 *
 * If a API payload contains properties which are arrays, in some
 * cases an API will provide the array in a different order between
 * requests which affects the signature of the TapjawMessage.
 *
 * This function supports arrays containing objects or any scalar types.
 *
 * @param payload Payload
 */
declare const sortObjevtArrays: <T = object>(payload: Payload) => T;
export default sortObjevtArrays;
