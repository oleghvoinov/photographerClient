const ADD_FILE_MAIN = "ADD_FILE_MAIN";
const DELETE_FILE_MAIN = "DELETE_FILE";

const defaultState = {
  filesMainPage: [],
};

export function mainFileReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_FILE_MAIN:
      return {
        ...state,
        filesMainPage: action.payload,
      };
    case DELETE_FILE_MAIN:
      return {
        ...state,
        filesMainPage: [
          ...state.filesMainPage.map((file) => {
            if (file) {
              if (file.index == action.payload) {
                return null;
              } else {
                return file;
              }
            }
          }),
        ],
      };
    default:
      return state;
  }
}

export const addMainFile = (file) => ({
  type: ADD_FILE_MAIN,
  payload: file,
});
export const deleteFileMain = (fileId) => ({
  type: DELETE_FILE_MAIN,
  payload: fileId,
});
