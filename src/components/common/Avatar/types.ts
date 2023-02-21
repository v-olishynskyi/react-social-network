import { User } from '@utils/types';
import { AvatarProps as PrimereactAvatarProps } from 'primereact/avatar';
export type AvatarProps = {
  user: User;
  badge?: number;
} & Partial<PrimereactAvatarProps>;
