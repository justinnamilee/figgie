# figgie

## **installation**

```bash
git clone https://github.com/justinnamilee/figgie.git
cd figgie
npm install
cp private/config-example.yml private/config.yml # edit as desired
node index.js
```

## **usage**

```
$ curl http://127.0.0.1:8969/test
  _            _
 | |_ ___  ___| |_
 | __/ _ \/ __| __|
 | ||  __/\__ \ |_
  \__\___||___/\__|

$ curl http://127.0.0.1:8969/test/3-D
   **                     **
  /**                    /**
 ******  *****   ****** ******
///**/  **///** **//// ///**/
  /**  /*******//*****   /**
  /**  /**////  /////**  /**
  //** //****** ******   //**
   //   ////// //////     //

$ curl -qs http://127.0.0.1:8969/font | jq | head -5
[
  "1Row",
  "3-D",
  "3D Diagonal",
  "3D-ASCII",
  ...
```

