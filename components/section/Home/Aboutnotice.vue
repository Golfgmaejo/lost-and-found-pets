<template>
  <div class="bg-color">
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" lg="7">
        <div class="text-center">
          <h2 class="text-portfolio-title">ประกาศของเรามีอะไรบ้าง?</h2>
          <p class="text-portfolio">
            ประกาศทั้งหมดนี้ถูกจัดทำขึ้นเพื่อช่วยเหลือสัตว์เลี้ยงและเจ้าของในการหากันและกัน
            และเพื่อช่วยสัตว์เลี้ยงที่ต้องการบ้านใหม่ให้ได้รับโอกาสที่ดีในชีวิตใหม่
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="content-row">
      <v-col class="content-col">
        <nuxt-link to="/lost_pet" class="no-underline link-container">
          <div class="icon-container">
            <LcLogoLostPets />
            <div>
              <p class="text-portfolio-h">ประกาศสัตว์เลี้ยงหาย</p>
              <p class="text-center text-portfolio">
                ประกาศเกี่ยวกับสัตว์เลี้ยงที่หายไป โดยระบุรายละเอียดต่าง ๆ เช่น
                ชื่อสัตว์, รูปภาพ, เพศ, อายุ, สายพันธุ์, รางวัล, วันที่หาย,
                และสถานที่หาย
              </p>
            </div>
          </div>
        </nuxt-link>
      </v-col>
      <v-col class="content-col">
        <nuxt-link to="/find_owner" class="no-underline link-container">
          <div class="icon-container">
            <LcLogoFindowner />
            <div>
              <p class="text-portfolio-h">ประกาศหาเจ้าของ</p>
              <p class="text-center text-portfolio">
                สัตว์เลี้ยงที่ถูกพบ แต่ไม่มีเจ้าของ
                โดยระบุรายละเอียดเกี่ยวกับสัตว์เลี้ยงที่พบ
                เพื่อให้เจ้าของที่แท้จริงสามารถติดต่อรับสัตว์เลี้ยงกลับบ้านได้
              </p>
            </div>
          </div>
        </nuxt-link>
      </v-col>
      <v-col class="content-col">
        <nuxt-link to="/adopt_pet" class="no-underline link-container">
          <div class="icon-container">
            <LcLogoAdoptpet />
            <div>
              <p class="text-portfolio-h">ประกาศหาบ้าน</p>
              <p class="text-center text-portfolio">
                สัตว์เลี้ยงที่ต้องการบ้านใหม่ โดยมีรายละเอียดเช่น อายุ, เพศ,
                สายพันธุ์, ลักษณะนิสัย
                เพื่อให้ผู้ที่สนใจรับเลี้ยงสามารถตัดสินใจได้ง่ายขึ้น
              </p>
            </div>
          </div>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
  </div>
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
  margin-top: 16px;
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

.text-center {
  text-align: center;
}
</style>
