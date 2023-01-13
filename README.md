# Node & Npm version

### `node v14.17.6`

### `npm v6.14.15`

# Visual Code Extensions

Before start the project, please install all of extensions below:

1. `Bracket Pair Colorizer 2`
2. `JavaScript (ES6) code snippets`
3. `ESLint`
4. `Prettier` (need set to default)
5. `Material Icon Theme`
6. `Typescript React code snippets`

# Code Conventions

Always organize import

- Window: `Alt + Shift + O`
- Mac: `Option + Shift + O`

File name conventions:

- API file name: `camelCase.ts`
- Component file name: `PascalCase.tsx`
- SCSS file name: `kebab-case.scss`
- Util file name: `camelCase.ts`
- Model file name: `camelCase.ts`
- Slice file name: `camelCase.ts`
- Config & Constant file name: `camelCase.ts`
- Image file name: `lower_underscore_case.<jpeg|jpg|png>`

Snippets:

- Create component: `tsrsfc`

# CSS Code Conventions

Use `scss`\
Use BEM (Block-Element-Modifier) style.

# Struct of Project

```
│   .gitignore
│   .prettierrc
│   package.json
│   README.md
│   tsconfig.json
│
├───public
│   │   favicon.ico
│   │   index.html
│   │   logo192.png
│   │   logo512.png
│   │   manifest.json
│   │   robots.txt
│   │
│   └───locales
│       ├───en
│       │       translation.json
│       │
│       └───th
│               translation.json
│
└───src
    │   App.scss
    │   App.test.tsx
    │   App.tsx
    │   index.scss
    │   index.tsx
    │   logo.svg
    │   PrivateRoute.tsx
    │   variables.scss
    │
    ├───api
    │       axiosClient.ts
    │       currencyApi.ts
    │
    ├───app
    │       hooks.ts
    │       store.ts
    │
    ├───components
    │   ├───Common
    │   │       Footer.tsx
    │   │       Header.tsx
    │   │       index.ts
    │   │
    │   ├───FormFields
    │   │       index.ts
    │   │       InputField.tsx
    │   │
    │   └───Layout
    │           AccountLayout.tsx
    │           index.ts
    │
    ├───config
    │       i18n.ts
    │
    ├───constants
    ├───features
    │   └───account
    │       │   accountSlice.ts
    │       │
    │       ├───components
    │       ├───pages
    │       │       DashboardPage.tsx
    │       │
    │       └───styles
    ├───hooks
    ├───models
    │   │   common.ts
    │   │   index.ts
    │   │
    │   └───ohlc
    │           marketPriceSocket.ts
    │
    └───utils
            commonUtil.ts
            index.ts
```

# Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />

# Dispatch and Selector hooks

Use `useAppDispatch` and `useAppSelector` instead of `useDispatch` and `useSelector`

# Organize Form Module

- Package: `React Hook Form`
- Form Validation: `Yup`
- Helper: `Validation Resolver`
- Error Message: `ErrorMessage`

### Principle:

- A Form contain many fields
- Form field is the bridge between Form and UI control
- UI control are `<input>`, `<select>` or custom components of UI library

```
    Pages/Container
        ⭣
    Form Component
        ⭣
    Form Fields (Base Controls)
        ⭣
    UI Control
```

- `Form Component`: Handle form validations and trigger callback on submit.
- `Form Fields`: InputField, PhotoField, MapPickerField... A coordinator between form state and UI control.
- `UI Control`: input, checkbox or a control from an external lib. A dump component which receives data from Form Field and render it accordingly.

### Guide Grid System:

- Prefix class:
  - `c:` mobile
  - `m:` tablet
  - `l:` pc
  - `xl:` pc sreen large
- Set class name following:

```
grid -> row -> col l-x

x: number column
```

### CSS Responsive:

```css
// --------- RESPONSIVE ---------
/* Mobile*/
@media only screen and (max-width: 46.1875em) {
}

/* Tablet */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
}

/* PC */
@media only screen and (min-width: 64em) {
}
```

### Customize Ant Design Css

```
npx gulp less
```
