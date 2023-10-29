import dbClient from './dbClient';
import createAllIndexes from './createIndex';
import IUser from 'IUser';
import IDeliveryAssociate, {
  DeliveryAssociateStatus,
} from './types/IDeliveryAssociate';
import createOneUser from './services/users/createOne';
import createOneDA from './services/deliveryAssociates/createOne';
import findUserByEmail from './services/users/findByEmail';
import findDAByEmail from './services/deliveryAssociates/findByEmail';

const daHoss: IDeliveryAssociate = {
  name: 'Hoss',
  email: 'hoss@example.com',
  status: DeliveryAssociateStatus.available,
  currentLocation: { coordinates: [0, 0], type: 'Point' },
};

const userAhmed: IUser = {
  name: 'Ahmed',
  email: 'ahmed@example.com',
  password: 'password123',
};

const main = async () => {
  await dbClient();
  await createAllIndexes(); // Checking indexes on seeders might be required if seeders are executed separately.
  const ahmed = await findUserByEmail(userAhmed.email);
  if (!ahmed) {
    await createOneUser(userAhmed);
  }
  const hoss = await findDAByEmail(daHoss.email);
  if (!hoss) {
    await createOneDA(daHoss);
  }
};

export default main;
