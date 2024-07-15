<template>
  <div>
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
        <v-row>
          <v-col style="display: flex; justify-content: space-evenly">
            <nuxt-link to="/notice" class="no-underline">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <LcLogoNoticePets />
                <div>
                  <p class="text-portfolio-h">ประกาศสัตว์เลี้ยงหาย</p>
                  <p class="text-center text-portfolio">
                    ประกาศเกี่ยวกับสัตว์เลี้ยงที่หายไป โดยระบุรายละเอียดต่าง ๆ
                    เช่น ชื่อสัตว์, รูปภาพ, เพศ, อายุ, สายพันธุ์, รางวัล,
                    วันที่หาย, และสถานที่หาย
                    เพื่อช่วยให้ผู้พบเห็นสามารถช่วยตามหาสัตว์เลี้ยงที่หายไปได้ง่ายขึ้น
                  </p>
                </div>
              </div>
            </nuxt-link>
          </v-col>
          <v-col style="display: flex; justify-content: space-evenly">
            <nuxt-link to="/findowner" class="no-underline">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <LcLogoPetsCatDog />
                <div>
                  <p class="text-portfolio-h">ประกาศหาเจ้าของ</p>
                  <p class="text-center text-portfolio">
                    สัตว์เลี้ยงที่ถูกพบ แต่ไม่มีเจ้าของ
                    โดยระบุรายละเอียดเกี่ยวกับสัตว์เลี้ยงที่พบ
                    เพื่อให้เจ้าของที่แท้จริงสามารถติดต่อกลับและรับสัตว์เลี้ยงของตนกลับบ้านได้.
                  </p>
                </div>
              </div>
            </nuxt-link>
          </v-col>
          <v-col style="display: flex; justify-content: space-evenly">
            <nuxt-link to="/adoptpet" class="no-underline">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <LcLogoTargetPets />
                <div>
                  <p class="text-portfolio-h">ประกาศหาบ้าน</p>
                  <p class="text-center text-portfolio">
                    สัตว์เลี้ยงที่ต้องการบ้านใหม่
                    โดยมีรายละเอียดเกี่ยวกับสัตว์เลี้ยงที่ต้องการหาบ้าน เช่น
                    อายุ, เพศ, สายพันธุ์, และลักษณะนิสัย
                    เพื่อให้ผู้ที่สนใจรับเลี้ยงสามารถตัดสินใจได้ง่ายขึ้น
                  </p>
                </div>
              </div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style>
.mini-spacer {
  padding: 30px 0;
}
.bg-color {
  background-color: #faf6f0;
}
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 24px;
  font-weight: 700;
}
.text-portfolio-h {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 20px;
  font-weight: 600;
  margin: 12px;
  display: flex;
  justify-content: space-evenly;
}
.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 18px;
  font-weight: 400;
}
.no-underline {
  text-decoration: none;
}
</style>
