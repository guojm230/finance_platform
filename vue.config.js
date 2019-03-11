module.exports = {
  pages:{
    admin:{
      entry:"src/pages/admin/main.ts",
      template: 'public/admin.html',
      // 在 dist/index.html 的输出
      filename: 'admin.html',
      title: 'Index Page',
    },
    index:{
      entry:"src/pages/client/main.ts",
      template: 'public/client.html',
      filename: 'client.html',
      title: 'client index page',
    }
  }
};
