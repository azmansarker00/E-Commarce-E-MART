import { v4 as uuidv4 } from 'uuid';

export const generateSecure1 = () => uuidv4() + uuidv4() + uuidv4() + "--";
export const generateSecure2 = () => "--" + uuidv4() + uuidv4() + uuidv4();
