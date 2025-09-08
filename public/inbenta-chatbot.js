var surveyDisplay;
var productvariable = "demo";
var source_backstage = "demo";
var org_name = "dipshi";

var keyvars = {
  inbentakeyvar: 'BhVHkn+l/UvjD6aGczScQM8TIvDDd7Iyrcrmc9rmAqU=',
  domainkeyvar: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3NrX2NzaGRfZGVtb18xMTk1X2NoYXRib3RfZW4iLCJkb21haW5fa2V5X2lkIjoiQmhqbmgwalZjR2dEM0RRV20zejVtUTo6In0.XIRUzUGTr8e1iV6ThtNxbw5ty14KBC4AV1GTfo299ckQag7M2bdjqI1gdcyYnMHYl4-7gtaVfKsYZ55N5jWt8w'
};

var inbChatbotApp = {
  sdkChatbotIntegration: {
    product: 'chatbot',
    version: '1.72.0', // updated to latest
    integrity: 'sha384-HlSG7tD87XsgPLEqQ/y0pomXhrEH32bVQQ4HopRNHYF2fBPfBTrJFCJkdeSeWhKk'
  },
  sdkChatbotAuth: {
    inbentaKey: 'BhVHkn+l/UvjD6aGczScQM8TIvDDd7Iyrcrmc9rmAqU=',
    domainKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3NrX2NzaGRfZGVtb18xMTk1X2NoYXRib3RfZW4iLCJkb21haW5fa2V5X2lkIjoiQmhqbmgwalZjR2dEM0RRV20zejVtUTo6In0.XIRUzUGTr8e1iV6ThtNxbw5ty14KBC4AV1GTfo299ckQag7M2bdjqI1gdcyYnMHYl4-7gtaVfKsYZ55N5jWt8w'
  },
  sdkChatbotConfig: {
    chatbotId: 'cshd_demo_chatbot',
    skin: 'tatooine-sunset',
    environment: 'development',
    showLoader: true,
    source: 'test',
    inputCharacterCounter: false,
    inputCharacterCounterMax: 256,
    userType: 0,

    conversationWindow: {
      position: {
        top: null,
        left: null,
        bottom: 30,
        right: 15
      }
    },
    forms: {
      errorRetries: 3,
      allowUserToAbandonForm: true
    },
    closeButton: {
      visible: true
    },
    launcher: {
      title: 'Chat with us'
    },
    lang: 'en',
    html: {
      'conversation-window-header':
        '<div class="inbenta-bot__chat__header">' +
        '<div class="header__title">' +
        '<img src="replacethisimagewithalogo" style="max-width:70px; margin-right:10px; margin-top:5px;">' +
        '</div>' +
        '<conversation-window-header-buttons />' +
        '</div>'
    },
    labels: {
      en: {
        'escalate-chat': 'Do you want to start a chat with a Live Chat Specialist?',
        'custom-user-type-question': 'Are you a Healthcare Professional or a Patient?',
        'rate-content': 'Was this answer helpful?'
      }
    },
    sanitizerOptions: {
      allowedTags: [
        'h1','h2','h3','h4','h5','h6','blockquote','p','a','ul','ol','nl','li',
        'b','i','strong','em','strike','code','hr','br','div','table','thead','caption',
        'tbody','tr','th','td','pre','img','svg','circle','video','iframe'
      ],
      allowedAttributes: {
        img: ['src','href','width','height'],
        div: ['class','id'],
        iframe: ['height','src','width'],
        svg: ['class','id','x','y','viewBox'],
        circle: ['class','id','cx','cy','r'],
        a: ['href','target'],
        table: ['border','style','width'],
        td: ['border','style','width'],
        tr: ['border','style','width'],
        tbody: ['border','style','width']
      }
    },
    ratingOptions: [
      { id: 1, label: 'yes', comment: false, response: 'Thank you!' },
      { id: 2, label: 'no', comment: true, response: 'We are sorry about that.' }
    ],
    ratingPosition: 'mixed',
    surveyId: '1'
  }
};

window.inbChatbotAppSdk = inbChatbotApp;

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory()
    : typeof define === 'function' && define.amd
    ? define(factory)
    : factory();
})(this, (function() {
  'use strict';

  function importScript(script, callback) {
    var dom = document.createElement('script');
    if (callback) dom.onload = callback;
    dom.type = script.type || 'text/javascript';
    if (typeof script === 'object') {
      if (script.src) dom.src = script.src;
      if (script.integrity) dom.integrity = script.integrity;
      if (script.crossorigin) dom.crossOrigin = script.crossorigin;
    } else if (typeof script === 'string') {
      dom.src = script;
    } else {
      throw new Error('Helper - importScript: script argument passed is not valid');
    }
    document.getElementsByTagName('head')[0].appendChild(dom, document.currentScript);
  }

  function getSDKScript(conf) {
    var script = {};
    script.type = 'text/javascript';
    script.src = 'https://sdk.inbenta.io/' + conf.product + '/' + conf.version + '/inbenta-' + conf.product + '-sdk.js';
    if (conf.integrity) {
      script.integrity = conf.integrity;
      script.crossorigin = 'anonymous';
    }
    return script;
  }

  function getScriptParams(name) {
    var e = document.getElementsByTagName('script');
    for (var t = 0; t < e.length; t++) {
      if (e[t] && e[t].src && e[t].src.search(name) > -1 && e[t].src.indexOf('?') > -1) {
        var n = e[t].src.split('?').pop().split('&');
        var s = {};
        for (var l = 0; l < n.length; l++) {
          var a = n[l].split('=');
          s[a[0]] = a[1];
        }
        return s;
      }
    }
    return {};
  }

  function storageManagerAdapter(storageManager) {
    return function(chatbot) {
      chatbot.subscriptions.onResetSession(function(next) {
        storageManager.clear();
        return next();
      });
    };
  }

  var StorageManager = function StorageManager(chatbotId) {
    this.DATA_INDEX = chatbotId + '_storage_data';
  };
  StorageManager.prototype.has = function(index) {
    var data = this.get();
    return data.hasOwnProperty(index);
  };
  StorageManager.prototype.get = function(index) {
    var data = JSON.parse(localStorage.getItem(this.DATA_INDEX));
    if (typeof data !== 'object' || data === null) {
      data = {};
      this.set(null, data);
    }
    return index ? data[index] : data;
  };
  StorageManager.prototype.set = function(index, value) {
    var data = '';
    if (index) {
      data = this.get();
      data[index] = value;
    } else {
      data = value;
    }
    localStorage.setItem(this.DATA_INDEX, JSON.stringify(data));
  };
  StorageManager.prototype.remove = function(index) {
    var data = this.get();
    delete data[index];
    localStorage.setItem(this.DATA_INDEX, JSON.stringify(data));
  };
  StorageManager.prototype.clear = function() {
    localStorage.removeItem(this.DATA_INDEX);
  };

  if (typeof window.inbChatbotAppSdk === 'undefined') {
    throw new ReferenceError("Inbenta Chatbot SDK couldn't be started, missing conf file.");
  }

  var appChatbot = window.inbChatbotAppSdk;
  appChatbot.sdkChatbotConfig.adapters = appChatbot.sdkChatbotConfig.adapters || [];

  var storage = new StorageManager(appChatbot.sdkChatbotConfig.chatbotId);
  var params = getScriptParams();
  var userType = (params.userType && params.userType !== 'null' && params.userType !== 'none') ? params.userType : undefined;
  var product = (params.product && params.product !== 'null' && params.product !== 'none') ? params.product : undefined;

  if (typeof storage.get('userType') === 'undefined') storage.set('userType', userType);
  if (typeof storage.get('product') === 'undefined') storage.set('product', product);

  var sdkChatbotScript = getSDKScript(appChatbot.sdkChatbotIntegration);
  importScript(sdkChatbotScript, function() {
    appChatbot.sdkChatbotConfig.adapters.push(SDKInbentaChatbotSurveyAdapter(1));
    window.InbentaChatbotSDK.buildWithDomainCredentials(appChatbot.sdkChatbotAuth, appChatbot.sdkChatbotConfig);
  });
}));
