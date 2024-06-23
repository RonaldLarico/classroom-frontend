import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { GroupData } from '../../interface/interface';

export const toggleSelectAll = createAction('TOGGLE_SELECT_ALL');

export const toggleIndividualCheckbox = createAction<number>('TOGGLE_INDIVIDUAL_CHECKBOX');

export const setGroupData = createAction<GroupData[]>('SET_GROUP_DATA');
