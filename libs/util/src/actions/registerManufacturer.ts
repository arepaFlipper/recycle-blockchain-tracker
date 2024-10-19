import { ActionType } from '../types';

export type TRegisterManufacturer = ActionType<{ name: string, location: string, contact: string }>;

export async function registerManufacturer({ contract, payload: { name, location, contact }, }: TRegisterManufacturer): Promise<boolean> {
  try {
    const tx = await contract.registerManufacturer(name, location, contact);
    const receipt = await tx.wait();
    return receipt?.status === 1;
  } catch (error) {
    console.error(error);
    return false;
  }

}
