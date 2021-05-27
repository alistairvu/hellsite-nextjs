import { atom } from 'recoil';

const userAtom = atom({
  key: 'userAtom',
  default: {
    id: 0,
    username: '',
    email: '',
  },
});

export default userAtom;
