// import rolesAndApps from '@/common/fakeData/rolesAndApps'
// import userDetail from '@/common/fakeData/userDetail'

export default {
  Login: {
    request: { url: '/sso/v1/app/auth', method: 'post' },
    mock: { success: { token: '1584409060155' } }
  },
  Logout: {
    request: { url: '/sso/api/v1/app/bye', method: 'post' },
    mock: { success: {} }
  },
  Resetpwd: {
    request: { url: '/sso/v1/web/password/reset', method: 'post' },
    mock: { success: {} }
  },
  GetCaptcha: {
    request: { url: '/sso/v1/web/captchas', method: 'post' },
    mock: { success: {} }
  },
  CheckCaptcha: { request: { url: '/sso/v1/captchas/check', method: 'post' } },
  ResetToken: {
    request: { url: '/sso-token/v1/refresh', method: 'post' },
    mock: { success: { token: '1584409060155' } }
  },
  UserDetail: {
    request: {
      url: '/dt-ecampus/user/v1/service/account/user-detail',
      method: 'get'
    }
  },
  UserUpdate: {
    request: {
      url: '/dt-ecampus/user/v1/service/account/user-update',
      method: 'post'
    },
    mock: { success: {} }
  },
  GetQrcode: {
    request: { url: '/qr_code/api/v1/init', method: 'get' },
    mock: {
      success: {
        unique_code: 'kxxidkkdidkck',
        base64:
          'data:image/png;base64,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',
        created_at: 1584409060155,
        expired_at: 1584452260155
      }
    }
  },
  QrcodeCheck: {
    request: { url: '/qr_code/api/v1/check', method: 'get' },
    mock: { error: '超时了' }
  },
  SaveQuickApps: {
    request: {
      url: '/dt-ecampus/user/v1/service/account/save-personalized-apps',
      method: 'post'
    },
    mock: { success: {}, error: '保存失败' }
  },
  UploadFile: {
    request: { url: '/dt-ecampus/file/file/upload', method: 'post' },
    mock: {
      success: {
        id: '1537411423dlespo',
        name: 'c533560634bd2ca9f7343a75b16a0f90.jpg',
        path:
          'http://dtedu-cloudstorage.oss-cn-beijing.aliyuncs.com/upload/jpg/c5/33/c533560634bd2ca9f7343a75b16a0f90/src/c533560634bd2ca9f7343a75b16a0f90.jpg',
        md5: 'c533560634bd2ca9f7343a75b16a0f90',
        size: 253851,
        extension: 'jpg',
        extra_info: { width: 1600, height: 375 },
        process: 'finish'
      },
      error: {}
    }
  },
  InitRelation: {
    request: {
      url: '/dt-ecampus/content/v2/common/init-relations',
      method: 'get'
    }
  },
  TagList: {
    request: { url: '/dt-ecampus/content/v1/common/tag-list', method: 'get' }
  }
}
