class BaseJob {
  // job 실행 전
  async beforeProcess() {}
  // 실제 동작
  async process() {}
  // job 실행 후
  async afterProcess() {}
  // 에러 콜백
  async onError(e) {
    throw e;
  }
  async run() {
    await this.beforeProcess();
    try {
      await this.process();
    } catch (e) {
      this.onError(e);
    }
    await this.afterProcess();
  }
}

module.exports = { BaseJob };
