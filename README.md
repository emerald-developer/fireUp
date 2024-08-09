# fireUp

fireUp is a CLI tool that allows you to interact with Git repositories using Firebase. It provides the following commands:

## Commands

1. **upload**:
   - Uploads the contents of a directory to Firebase Storage, with encryption.
   - Required options:
     - `-f, --folderPath <folderPath>`: The folder path or file path to upload.
     - `-p, --password <password>`: The password to use for encryption.

2. **list**:
   - Lists the decrypted file paths of all files in a Firebase Storage directory.
   - Required option:
     - `-p, --password <password>`: The password to use for encryption.
   - Optional option:
     - `-f, --folderPath <folderPath>`: The folder path in Firebase Storage.

3. **download**:
   - Downloads the contents of a directory or a single file from Firebase Storage, with decryption.
   - Required options:
     - `-fip, --firebasePath <firebasePath>`: The folder or file path in Firebase.
     - `-lp, --localPath <localPath>`: The local path to which the file or folder should be downloaded.
     - `-p, --password <password>`: The password to use for encryption.

4. **delete**: 
   - Deltes the contents of a directory or a single file from Firebase Storage.
   - Required options:
     - `-fip, --firebasePath <firebasePath>`: The folder or file path in Firebase.
     - `-p, --password <password>`: The password to use for encryption.

## Installation and Usage

1. Install the required dependencies(make sure you have bun installed on your system):
   ```
   bun install
   ```

2. Configure Firebase:
   - Create a Firebase project and obtain the necessary configuration details (e.g., API key, project ID, etc.).
   - Create a `.env` file in the project root directory and add the Firebase configuration details:
     ```
     bun fireUp init -key apiKey -db databaseURL -auth authDomain -project projectId -bucket storageBucket -senderId messagingSenderId -app appId
     ```

3. Use the CLI:
   - To upload a directory to Firebase Storage with encryption:
     ```
     bun fireUp upload -f /path/to/directory -p your-password
     ```
   - To list the decrypted file paths in a Firebase Storage directory:
     ```
     bun fireUp list -p your-password -f /path/to/directory
     ```
   - To download a file or directory from Firebase Storage with decryption:
     ```
     bun fireUp download -fip /path/to/file/or/directory -lp /local/path -p your-password
     ```

Please note that the `fireUp` CLI tool is designed to work with encrypted files and folders in Firebase Storage. Make sure to use the correct password when performing operations to ensure proper encryption and decryption.
