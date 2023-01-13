import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BadRequestFieldError } from 'models';

export interface FormState {
  isSubmitting: boolean;
  fieldErrors: BadRequestFieldError;
}

const initialState: FormState = {
  isSubmitting: false,
  fieldErrors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setFieldErrors: (state, action: PayloadAction<BadRequestFieldError>) => {
      state.fieldErrors = action.payload;
    },
    removeFieldError: (state, action: PayloadAction<string>) => {
      if (state.fieldErrors && state.fieldErrors[action.payload]) {
        delete state.fieldErrors[action.payload];
      }
    },
    resetFormState: () => initialState,
  },
});

// Actions
export const { setIsSubmitting, setFieldErrors, removeFieldError, resetFormState } =
  formSlice.actions;

// Selectors
export const selectIsSubmitting = (state: RootState) => state.form.isSubmitting;
export const selectFieldErrors = (state: RootState) => state.form.fieldErrors;

// Reducer
export default formSlice.reducer;
