// actions.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupData } from '../../interface/interface';

interface CheckboxState {
  selectAllChecked: boolean;
  groupData: GroupData[];
}

const initialState: CheckboxState = {
  selectAllChecked: true,
  groupData: [],
};

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    toggleSelectAll: (state) => {
      state.selectAllChecked = !state.selectAllChecked;
      state.groupData = state.groupData.map(group => ({
        ...group,
        students: group.students.map(student => ({
          ...student,
          isChecked: !state.selectAllChecked,
        })),
      }));
    },
    toggleIndividualCheckbox: (state, action: PayloadAction<number>) => {
      const studentId = action.payload;
      state.groupData = state.groupData.map(group => ({
        ...group,
        students: group.students.map(student => ({
          ...student,
          isChecked: student.student.id === studentId ? !student.isChecked : student.isChecked,
        })),
      }));
    },
    setGroupData: (state, action: PayloadAction<GroupData[]>) => {
      state.groupData = action.payload;
    },
  },
});

export const { toggleSelectAll, toggleIndividualCheckbox, setGroupData } = checkboxSlice.actions;

export default checkboxSlice.reducer;
