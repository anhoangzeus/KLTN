# KLTN
- không commit kiểu "test nek" nữa làm gì thì ghi rõ ra để t còn biết làm gì
- tạo nhánh mới clone project về rồi gõ "git checkout -b TienAnhbranch" để tạo nhánh mới của m
- sư dụng yarn add để thêm thư viện sau quản lý cho dễ
Tạo module bằng Plop 

# Install plop
yarn global add plop

# Generate new module
plop module <module_name>

![image](https://user-images.githubusercontent.com/56404406/110656174-484ce600-81f2-11eb-990d-e674d3c65210.png)

 nó hiện ra 3 cái lựa chọn như ảnh

scenes
Module cho 1 màn hình nằm trong (src/scenes/main/) gồm có (.view, .container, .styles, .constants), -view: là nơi chỉ chứa code của các view component, không xử lý logic phức tạp như call api,actions, redux,.. -container: Là nơi chứa tất cả các logic business của màn hình đó như call actions, selector, onClick, timeout,... -styles: Là nơi chứa tất cả các style của view, -constants: Là nơi chứa các constants riêng biệt cho screen đó


component
Module cho một component nằm trong (src/components/) gồm có (index.js, styles.js), component không chứa các logic như call api, actions,..., cái này cái nào dùng nhiều tạo trong đây để xài lại


redux
Bộ module (redux, saga, actions, actionTypes, selector, services, parsers) cho 1 model của app (ví dụ auth) dùng api thì đụng tới cái này lên mạng kiếm tài liệu mà đọc

sơ đồ source 

- android                        # Android native project
- ios                            # Ios native project
- src                            # source code for both platform
  - assets                       # Contain all assets like fonts, icons, images
  - components                   # Precision components
   - AppText
   - AppLoading
   - AppButton
   - AppTextInput
   - AppIcon                     # include svg, react-native-vector-icons
   - AwareScrollView             # avoid keyboard view
   - HOC                         # contains high order components 
   - Input
   - ListViewCustom              # Render list view component like FlatList
   - Modal                       # Contain all Modal component all app
   - PaginationList              # Paging large list
   - Picker                      # Picker modal on ios and android is dropdown
   - ScrollViewPullRefresh       # ScrollView with pull to refresh function
  - configs                      # contains files for config application
   - appConfigs                  # static app configures (END_POINT, ENV...)             
  - constants                    # contain all static constants app
     - appFonts                  # define default font size, family
     - colors                    # define default colors
     - sceneName                 # define scene name
     - size                      # define size
  - helpers                      # contain functions helper logic (handle error from api, permission, saga,...)
  - hooks                        # contain custom hooks
  - locales                      # contain strings translation
  - scenes                       # Screen
   - auth
      - signIn
         - SignIn.container       # container: handler logic (dispatch action, onChangeValue, etc)
         - SignIn.constants       # constants: static constants (NAMESPACE, ...)
         - SignIn.styles          # styles: static styles
         - SignIn.View            # View: UI/UX
   - main
      - home
         - Home.container
         - Home.constants
         - Home.styles
         - Home.view
  - utils                        # Contain all Utilities
     - apiUtils                  # Support call api with axios
     - storge                    # hepler get, set, remove AsynceStorge
     - navigationServices         # Navigation functions
  - App.js                       # Register model, router, plugins
  - routes                       # Config router
  - services                     # Define API call to back-end and business logic
  - appRedux                        #  This will contain all our redux state management files like actions, reducers,
   store config, saga, etc.
   ## https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
     - actionsType               #
     - actions                   # The only way to mutate the internal state is to dispatch an action.
        - authActions
     - reducers                  #
        - authReducer
        - loadingReducer
        - index                  # combine Reducers
     - saga
        - authSaga
        - index                  # fork all listener
     - selectors                 # compute derived data and used as input.
        - authSelector
     - store                     # A store holds the whole state tree of your application
- babelrc.js
- eslintrc.js
- package.json
- index.js
Navigation (cái này có nhiều cách dùng cho nhiều loại chuyển màn hình

Các action đã được setup sẵn trong file navigationServices.js



1. function navigate(name, params)

Chuyển đến 1 màn hình chỉ định theo name được truyền vào, có thể truyền thêm params là 1 object (ví dụ NavigationServices.navigate(SCENE_NAMES.DUMMY, {item: {name: 'a', id: 1}});)
Nếu tên màn hình cần đến đã tồn tại trong stack của navigator thì sẽ trở về màn hình trước đó và clear các màn hình ở sau nó.

NavigationServices.navigate(SCENE_NAMES.DUMMY);

2. function goBack()

Trở về màn hình trước đó

NavigationServices.goBack();

3. function resetActionTo(screen)

Reset lại hoàn toàn stack của navigator và render lại hoàn toàn màn hình đó, sẽ k thể back về màn hình trước vì stack đã reset lại hoàn toàn. Phù hợp cho trường hợp login, logout

NavigationServices.resetActionTo(SCENE_NAMES.SIGN_IN);

4. function push(name, params)

Push thêm 1 màn hình lên stack cho dù name có trùng với màn hình trước đó đã có trong stack

NavigationServices.push(SCENE_NAMES.SIGN_IN);

5. function replace(name, params)

Replace màn hình hiện tại với một màn hình mới

NavigationServices.replace(SCENE_NAMES.SIGN_IN);

6. function pop(count)

Xoá một số lượng count của stack navigator và back về màn hình top của stack

NavigationServices.pop(1);

7. function getParams(route)

Function này hỗ trợ lấy các param được truyền từ màn hình khác qua.

export default function SignInContainer({navigation, route}) {
  const params = getParams(route);
...
}

Phân trang (thích phân thì hỏi t ko thì thôi dài vl)

Localization (dùng cho làm đa ngôn ngữ rảnh thì làm ko thì thôi)

Sử dụng icon bằng file .svg

vẽ hình .svg trong stigma rồi export ra có code cho m bỏ vào để tự làm icon

Tạo file svg image.svg trong folder src/assets/icons. Chú ý svg phải đơn giản với các nét vẽ không rờm rà phức tạp. Các property như fill/stroke trong cái element của svg được move lên attribute của svg root

<svg xmlns="http://www.w3.org/2000/svg" 
fill="#fff"
width="15" height="11.25" viewBox="0 0 15 11.25">
  <path id="Path_275" data-name="Path 275" d="M14,0a.955.955,0,0,1,.625.25A.891.891,0,0,1,15,1v9.375a.955.955,0,0,1-.25.625,1.34,1.34,0,0,1-.75.25H1A1.34,1.34,0,0,1,.25,11,1.34,1.34,0,0,1,0,10.25V1A.955.955,0,0,1,.25.375.891.891,0,0,1,1,0ZM4.25,2.25a1.419,1.419,0,0,0-1-.375,1.419,1.419,0,0,0-1,.375,1.419,1.419,0,0,0-.375,1,1.419,1.419,0,0,0,.375,1,1.419,1.419,0,0,0,1,.375,1.419,1.419,0,0,0,1-.375,1.419,1.419,0,0,0,.375-1A1.419,1.419,0,0,0,4.25,2.25Zm8.875,7.125L9.375,3.75,6,8.125,3.75,6.5,1.875,9.375Z"/>
</svg>


Import vô path.js


import ImageIcon from './icons/image.svg';

export const SVG_NAME = {
  IMAGE: ImageIcon,
};

Render lên view

<AppIcon style={{color: 'red'}} name={SVG_NAME.IMAGE} />

2. Sử dụng icon từ react-native-vector-icons


Render lên view

<AppIcon name='home' type='AntDesign'  />
 
