import { User } from '@utils/types';
import { AvatarProps as PrimereactAvatarProps } from 'primereact/avatar';
export type AvatarProps = {
  user: Pick<User, 'fullname' | 'avatar' | 'last_name' | 'first_name'>;
  badge?: number;
} & Partial<PrimereactAvatarProps>;
