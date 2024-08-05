export function generateKeyFromString(keyString: string): number {
    // Simple hash function to convert string to a number
    // In a real scenario, use a more robust hashing algorithm
    let keyNum = 0;
    for (const char of keyString) {
        keyNum += char.charCodeAt(0);
    }
    return keyNum;
}

export function xorCipher(text: string, key: number): string {
    return text.split('').map(char => String.fromCharCode(char.charCodeAt(0) ^ key)).join('');
}

export function encryptFilePath(filePath: string, keyString: string): string {
    const key = generateKeyFromString(keyString);
    const parts = filePath.split('/');
    const encryptedParts = parts.map(part => xorCipher(part, key));
    return encryptedParts.join('/');
}

export function decryptFilePath(encryptedPath: string, keyString: string): string {
    const key = generateKeyFromString(keyString);
    const parts = encryptedPath.split('/');
    const decryptedParts = parts.map(part => xorCipher(part, key));
    return decryptedParts.join('/');
}

export function encrypt(data: string, password: string): string {
    const key = generateKeyFromString(password);
    return xorCipher(data, key);
}

export function decrypt(encryptedData: string, password: string): string {
    const key = generateKeyFromString(password);
    return xorCipher(encryptedData, key);
}
