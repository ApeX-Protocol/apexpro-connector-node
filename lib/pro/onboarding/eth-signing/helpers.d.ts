import { Address } from "../interface/main";
/**
 * Ethereum signed message prefix without message length.
 */
export declare const PREPEND_PERSONAL: string;
/**
 * Ethereum signed message prefix, 32-byte message, with message length represented as a string.
 */
export declare const PREPEND_DEC: string;
/**
 * Ethereum signed message prefix, 32-byte message, with message length as a one-byte integer.
 */
export declare const PREPEND_HEX: string;
export declare const EIP712_DOMAIN_STRING: string;
export declare const EIP712_DOMAIN_STRUCT: {
    name: string;
    type: string;
}[];
export declare const EIP712_DOMAIN_STRING_NO_CONTRACT: string;
export declare const EIP712_DOMAIN_STRUCT_NO_CONTRACT: {
    name: string;
    type: string;
}[];
export declare function isValidSigType(sigType: number): boolean;
/**
 * Recover the address used to sign a given hash or message.
 *
 * The string `hashOrMessage` is a hash, unless the signature has type SignatureTypes.PERSONAL, in
 * which case it is the signed message.
 */
export declare function ecRecoverTypedSignature(hashOrMessage: string, typedSignature: string): Address;
export declare function createTypedSignature(signature: string, sigType: number): string;
/**
 * Fixes any signatures that don't have a 'v' value of 27 or 28
 */
export declare function fixRawSignature(signature: string): string;
export declare function stripHexPrefix(input: string): string;
export declare function addressesAreEqual(addressOne: string, addressTwo: string): boolean;
export declare function hashString(input: string): string;
