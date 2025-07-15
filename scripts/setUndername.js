import fs from 'fs';
import { ANT, ArweaveSigner } from '@ar.io/sdk';

async function setUndername() {
    try {
        // Check for wallet.json
        if (!fs.existsSync('./wallet.json')) {
            throw new Error('wallet.json not found in the root of your project');
        }
        
        // CUSTOMIZE THESE VALUES
        // ======================
        // The transaction ID of your deployed application
        // This will be the output from your `npm run deploy` command
        const targetTransactionId = 'YOUR_TRANSACTION_ID_HERE';
        
        // The process ID for ARNS
        // The official AR.IO ARNS process ID is: sp8HiziIh6q02AfM0F6TQsj5o9L77x3cD_-o0iyQC2U
        const processId = 'ARNS_PROCESS_ID_HERE';
        
        // Your desired undername (subdomain prefix)
        // This will create a URL like: https://YOUR_UNDERNAME_<your-primary-name>.ar.io
        const undername = 'YOUR_UNDERNAME_HERE';
        // ======================
        
        console.log(`Using target transaction ID: ${targetTransactionId}`);
        console.log(`Using process ID: ${processId}`);

        const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));
        
        // Initialize the ANT with the process ID
        const ant = ANT.init({
            signer: new ArweaveSigner(jwk),
            processId: processId
        });

        console.log(`Setting undername: ${undername}`);

        // Create the undername record
        const { id: txId } = await ant.setUndernameRecord({
            undername: undername,
            transactionId: targetTransactionId,
            ttlSeconds: 900 // 15 minutes
        });

        console.log('\nUndername Record Update Complete! 🎉');
        console.log(`Transaction ID: ${txId}`);
        console.log(`Once propagated, your app will be available at: https://${undername}_<your-primary-name>.ar.io`);
    } catch (error) {
        console.error('Failed to update undername record:', error);
        process.exit(1);
    }
}

setUndername();
