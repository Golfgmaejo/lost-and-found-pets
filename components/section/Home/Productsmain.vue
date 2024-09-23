<template>
      <v-container>
        <v-divider class="border-opacity-100" color="#E97931"></v-divider>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center mini-spacer">
              <h2 class="text-portfolio-title">สินค้าสัตว์เลี้ยง</h2>
              <p class="text-portfolio">
                สินค้าสัตว์เลี้ยงคุณภาพสูงครบครันสำหรับการดูแลและพัฒนาสุขภาพของสัตว์เลี้ยงที่คุณรักให้มีชีวิตที่มีความสุขและสุขภาพดี
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row style="justify-content: flex-end">
          <v-btn
            class="float-right text-feature"
            color="accent"
            to="/product"
            style="font-weight: 500"
            >ดูทั้งหมด</v-btn
          >
        </v-row>
        <v-row class="content-row">
          <v-col class="content-col">
            <nuxt-link to="/product" class="no-underline link-container">
              <div class="icon-container">
                <LcLogoDogproduct />
                <div>
                  <p class="text-portfolio-h">สำหรับสุนัข</p>
                  <p class="text-center text-portfolio">
                    สินค้าสำหรับสุนัข เช่น อาหารสุนัข, ของเล่น,
                    และอุปกรณ์การดูแล เช่น แชมพู, หวี, และปลอกคอ
                    เพื่อให้สุนัขของคุณมีสุขภาพแข็งแรงและมีความสุข
                  </p>
                </div>
              </div>
            </nuxt-link>
          </v-col>
          <v-col class="content-col">
            <nuxt-link to="/product" class="no-underline link-container">
              <div class="icon-container">
                <LcLogoCatproduct />
                <div>
                  <p class="text-portfolio-h">สำหรับแมว</p>
                  <p class="text-center text-portfolio">
                    สินค้าสำหรับแมว เช่น อาหารแมว, ทรายแมว, ของเล่น, และบ้านแมว
                    และมีสินค้าเพื่อสุขภาพของแมวให้เลือกเพื่อช่วยให้แมวของคุณรู้สึกสบายและมีสุขภาพดี
                  </p>
                </div>
              </div>
            </nuxt-link>
          </v-col>
          <v-col class="content-col">
            <nuxt-link to="/product" class="no-underline link-container">
              <div class="icon-container">
                <LcLogoAllproduct />
                <div>
                  <p class="text-portfolio-h">สำหรับสัตว์เลี้ยงอื่นๆ</p>
                  <p class="text-center text-portfolio">
                    สินค้าสำหรับสัตว์เลี้ยงชนิดอื่น ๆ เช่น ปลา, นก, กระต่าย,
                    และหนูแฮมสเตอร์ ซึ่งมีทั้งอาหารและอุปกรณ์ต่าง ๆ
                    ที่เหมาะสมสำหรับสัตว์เลี้ยงของคุณ
                  </p>
                </div>
              </div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>

</template>

<style scoped>
.mini-spacer {
  padding: 40px 0;
}

.bg-color {
  background-color: #f9f5ef;
}

.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #6b6b6b;
  font-size: 18px;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.text-portfolio-h {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 22px;
  font-weight: 600;
  margin: 16px 0;
}

.content-row {
  margin-top: 40px;
}

.content-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.link-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
}

.link-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.icon-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.no-underline {
  text-decoration: none;
}
.v-btn {
  border-radius: 30px;
}
.text-feature {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  color: #fff;
  text-transform: none;
  background-color: #e97931;
  transition: background-color 0.3s ease;
}
.text-center {
  text-align: center;
}
</style>
