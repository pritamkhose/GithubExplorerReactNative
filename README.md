# Github Explorer Typescript React Native
Github Explorer Typescript React Native App using Github Rest API web services

Introduction
------------

The goal of this React Native Typescript application is to implement interface with Github REST API web service. 
It provide feature like search User's and it's details, along with list of user's Repositories, Followers and Following.

Getting Started
---------------
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). To build this project, use the `npm install` or 
`yarn install` command in [Visual Studio Code](https://code.visualstudio.com/download) or Getting Started with React native typescript project
```sh
npx react-native init GithubExplorerReactNative --template react-native-template-typescript
or 
npx react-native init GithubExplorerReactNative

yarn add @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-splash-screen
yarn add eslint-html-reporter -D


```
>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

Project command
---------
To run this project, use `yarn run android` or `yarn run ios`.
if need clean this project, use `yarn run android-clean` or `yarn run ios-clean`.

| yarn run ... | Description |
| --- | --- |
| android | Run android development-mode on simulator or phone |
| android-debug | Build android .apk with “Debug” configuration |
| android-release  | Build android .apk with “Release” configuration  |
| android-clean | Fix building android if preDexDebug error on Windows OS|
| android-clean-mac | Fix building android if preDexDebug error on Mac or linux OS |
| android-bundle | Bundle with entry file index.android.js |
| adb-reverse | Reset port ADB to tcp:8081 |
| adb-uninstall | Uninstall android .apk with “Debug” configuration port ADB to tcp:8081 |
| ios | Run iOS project with Simulator |
| ios-pod-install | install depedenceny for iOS project |
| ios-clean | Fix building ios if preDexDebug error|
| ios-release  | Build android .ipa with “Release” configuration  |
| ios-bundle | Bundle with entry file index.ios.js |
| ios-pod-clean | clean xcode & pod building |
| ios-device | list of iOS devices |
| ios-15 | Run iOS project with Simulator iPhone 15 only |
| node-clean| clean node modules |
| test  | jest test case and coverage reprot  |
| lint | eslint js file |
| lint:fix | fixing eslint to all js file |
| prettier | prettier js file |
| prettier:fix | fixing prettier to all js file |
| format| fixing eslint & prettier to all js file |
| lintreport | eslint report genrator |
| cleanreport | delete all report files |

To fix MAC Apple silcon devices M1 cocapad pod install issue fix by command where more info [Github issue tracker](https://github.com/CocoaPods/CocoaPods/issues/10287) and [Youtube video](https://www.youtube.com/watch?v=zdv9qE4j-VU).
```sh
cd ios
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
cd ..
```

Github Documentation
---------
The official [Github Documentation REST API v3](https://developer.github.com/v3/) in details.

Screenshots
-----------
![Search Users](screenshot/home.png "Home Screen to search user")
![User Detail](screenshot/userdetails.png "User Detail Screen")
![List of User Follower](screenshot/followers.png "List of User Follower")
![List of User Following](screenshot/following.png "List of User Following")
![List of User Repositories](screenshot/repo.png "List of User Repositories")
![List of User Public Gist](screenshot/gist.png "List of User Public Gist")

Libraries used
--------------
* [React Getting started](https://reactnative.dev/docs/getting-started) and [React Getting started Docs](https://microsoft.github.io/react-native-windows/docs/rnm-getting-started)
* [Getting Started with TypeScript](https://reactnative.dev/docs/typescript)
* [React Navigation](https://reactnavigation.org/docs/getting-started/)
* [Colors](https://reactnative.dev/docs/colors)
* [Scrollview](https://www.tutorialspoint.com/react_native/react_native_scrollview.htm)
* [Splash-Screen](https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9)
* [Handlebar Labs](https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae)
* [FastImage caching](https://www.npmjs.com/package/react-native-fast-image)
* [App Icon Generator iOS & Android](https://appicon.co/)
* [Colors](https://reactnative.dev/docs/colors)
* [Android Image Asset Studio](https://developer.android.com/studio/write/image-asset-studio)
* [React navigation Stack Navigator](https://reactnavigation.org/docs/stack-navigator/)

Eslint
--------------
* [prettier-eslint](https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/)


Axios references
--------------
* [React native with axios](https://betterprogramming.pub/managing-api-requests-http-https-in-react-native-using-axios-9ebf75cbca9b)
* [Example](https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb)
* [Axios with react](https://shyr.io/blog/axios-with-react-for-making-requests)
* [Timeout](https://stackoverflow.com/questions/36690451/timeout-feature-in-the-axios-library-is-not-working)
* [Handling errors](https://stackoverflow.com/questions/49967779/axios-handling-errors)


Install yarn dependencies
--------------
```sh
yarn add @react-navigation/native react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-navigation/stack

npx pod-install ios

cd ios && pod install --repo-update --ansi && cd..

yarn add @babel/preset-env --dev
yarn add eslint-html-reporter --dev

yarn add axios moment @react-native-community/netinfo 
yarn add react-native-fast-image react-native-modal
yarn add react-native-splash-screen
```

IDE setup
------------------------
For development, the latest version of [Android Studio](https://developer.android.com/studio/) is required. The latest version can be
downloaded from [Xcode](https://developer.apple.com/xcode/).


Upcoming features
-----------------
Updates will include many more feature and architectural pattern.


Sonar command
--------------
```sh

cd /sonarqube/bin/macosx-universal-64

sh sonar.sh console

http://localhost:9000/


echo $JAVA_HOME 

Set path in sonar wrapper.config 
wrapper.java.command=/Library/Java/JavaVirtualMachines/jdk-17.0.1.jdk/Contents/Home/bin/java


in env or bash file
export PATH=/Users/pritamkhose/Documents/code/sonar-scanner/bin:$PATH

sonar-scanner
or 
sonar-scanner \
  -Dsonar.projectKey=GithubExplorerReactNative \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=75d4adfa00f787ea2a2791cdab2fc16f9a47b50a
```

* [Sonarqube coverage](https://stackoverflow.com/questions/57799910/sonarqube-coverage-0-in-react-js)


# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
