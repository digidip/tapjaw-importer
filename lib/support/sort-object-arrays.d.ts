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
export default function sortObjectArrays<T = Record<string, unknown>>(payload: Record<string, unknown>): T;
