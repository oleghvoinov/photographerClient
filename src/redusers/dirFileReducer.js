const ADD_NEW_DIR = "ADD_NEW_DIR";
const SET_DIR = "SET_DIR";
const SET_ONE_DIR = "SET_ONE_DIR";
const REMOVE_DIR = "REMOVE_DIR";
const ADD_NEW_FILE = "ADD_NEW_FILE";
const REMOVE_FILE = "REMOVE_FILE";
const REMOVE_PREWIE_FILE = "REMOVE_PREWIE_FILE";
const REMOVE_CHILD_FILE = "REMOVE_CHILD_FILE";
const REMOVE_ONE_DIR = "REMOVE_ONE_DIR";

const defaultState = {
  dirs: [],
  files: [],
  oneDir: {},
};

function removeProperty(obj, propName) {
  if (!obj.hasOwnProperty(propName)) {
    return { ...obj }; // Возвращаем копию без изменений
  }
  const newObj = { ...obj }; // Создаём копию объекта
  delete newObj[propName]; // Удаляем указанное свойство
  return newObj;
}

export function dirFileReducer(state = defaultState, action) {
  switch (action.type) {
    case REMOVE_CHILD_FILE:
      console.log(state.oneDir);
      return {
        ...state,
        oneDir: {
          ...state.oneDir,
          [action.payload.dirId]: {
            ...state.oneDir[action.payload.dirId],
            children: state.oneDir[action.payload.dirId].children.filter(
              (item) => item.name != action.payload.name
            ),
          },
        },
      };
    case REMOVE_PREWIE_FILE:
      return {
        ...state,
        oneDir: {
          ...state.oneDir,
          [action.payload.dirId]: {
            ...state.oneDir[action.payload.dirId],
            prewieImg: state.oneDir[action.payload.dirId].prewieImg.filter(
              (item) => item.name != action.payload.name
            ),
          },
        },
      };
    case SET_ONE_DIR:
      console.log(action.payload);
      return {
        ...state,
        oneDir: { ...state.oneDir, [action.payload.id]: action.payload.dir },
        dirs: state.dirs,
      };
    case SET_DIR:
      return { ...state, dirs: action.payload };
    case ADD_NEW_DIR:
      return { ...state, dirs: [...state.dirs, action.payload] };
    case REMOVE_DIR:
      return {
        ...state,
        dirs: [...state.dirs.filter((dir) => dir._id != action.payload)],
      };
    case REMOVE_ONE_DIR:
      return {
        ...state,
        oneDir: removeProperty(state.oneDir, action.payload),
      };
    case ADD_NEW_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case REMOVE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id != action.payload)],
      };
    default:
      return state;
  }
}

export const setDir = (dirs) => ({ type: SET_DIR, payload: dirs });
export const setOneDir = (obj) => ({ type: SET_ONE_DIR, payload: obj });
export const addNewDir = (dir) => ({ type: ADD_NEW_DIR, payload: dir });
export const removeDir = (id) => ({ type: REMOVE_DIR, payload: id });
export const addNewFile = (file) => ({ type: ADD_NEW_FILE, payload: file });
export const removeFile = (id) => ({ type: REMOVE_FILE, payload: id });

export const removePrewieFile = (obj) => ({
  type: REMOVE_PREWIE_FILE,
  payload: obj,
});

export const removeChildrenFile = (obj) => ({
  type: REMOVE_CHILD_FILE,
  payload: obj,
});

export const removeOneDir = (id) => ({ type: REMOVE_ONE_DIR, payload: id });
