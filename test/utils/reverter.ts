import { ethers } from 'hardhat';

const { provider } = ethers;

export default class Reverter {
  snapshotId = 0;

  async snapshot(): Promise<any> {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const result = await provider.send('evm_snapshot', []);
      this.snapshotId = result;
      return this.snapshotId;
    } catch (error) {
      return error;
    }
  }

  async revert(): Promise<any> {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      await provider.send('evm_revert', [this.snapshotId]);
      const stanpshot = await this.snapshot();
      return stanpshot;
    } catch (error) {
      return error;
    }
  }
}
