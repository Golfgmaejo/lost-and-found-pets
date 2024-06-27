<script setup >
</script>
<template>
  <div>
    <div class="team-component mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Team Text
        ----------------------------------------------- -->
        <v-divider class="border-opacity-100" color="#E97931"></v-divider>

        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center" style=" margin-top: 12px;">
              <h2 class="text-title">บทความ</h2>
              <p class="text">
บทความเรื่องน่ารู้เกี่ยวกับสัตว์เลี้ยงให้ข้อมูลที่สำคัญเกี่ยวกับพฤติกรรม การฝึกฝน และความต้องการเฉพาะของสัตว์เลี้ยงแต่ละประเภท การเข้าใจสัตว์เลี้ยงอย่างลึกซึ้งช่วยสร้างความสัมพันธ์ที่แข็งแกร่งและเพิ่มคุณภาพชีวิตทั้งของสัตว์เลี้ยงและเจ้าของ.
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Team Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Team
        ----------------------------------------------- -->
        <v-row class="mt-13">
          <v-col cols="12" md="3" sm="6">
            <v-card elevation="0" class="team-card  mb-7">
              <div class="overflow-hidden">
                <img src="/images/testimonial/เห็บหมัด-วิธีกำจัดเห็บหมัด.jpg" class="img-fluid"/>
              </div>
              <div>
                <h5 class="title">
                  วิธีกำจัด เห็บหมัด ให้สัตว์เลี้ยงปลอดภัย
                </h5>
                <p class="subtitle">เห็บหมัด เป็นของอยู่คู่กับสัตว์เลี้ยงมานาน โดยเฉพาะสัตว์ขนเยอะ . . .</p>
              </div>
              <a
                  href="#"
                  class="text-subtitle linking text-decoration-none d-flex align-center"
                  style="margin-top: 12px;"
                >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
                </a>
            </v-card>
          </v-col>
          <!-- ------------------------------------card -------------------------------------------------------- -->
          <v-col cols="12" md="3" sm="6">
            <v-card elevation="0" class="team-card  mb-7">
              <div class="overflow-hidden">
                <img src="/images/testimonial/เชื้อราแมว.jpg" class="img-fluid"/>
              </div>
              <div>
                <h5 class="title">
                  รักษาเชื้อราแมว อย่างไรให้หายขาด ไม่กลับมาเป็นซ้ำอีก
                </h5>
                <p class="subtitle">การ รักษาเชื้อราแมว ให้หายดีแล้ว . . . </p>
              </div>
              <a
                  href="#"
                  class="text-subtitle linking text-decoration-none d-flex align-center"
                  style="margin-top: 12px;"
                >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
                </a>
            </v-card>
          </v-col>

           <!-- ------------------------------------card -------------------------------------------------------- -->
           <v-col cols="12" md="3" sm="6">
            <v-card elevation="0" class="team-card  mb-7">
              <div class="overflow-hidden">
                <img src="/images/testimonial/สุนัขสูงวัย.jpg" class="img-fluid"/>
              </div>
              <div>
                <h5 class="title">
                  เจ้าของต้องระวังโรคที่พบบ่อยในสุนัขสูงวัย
                </h5>
                <p class="subtitle">เจ้าของต้องระวังโรคที่พบได้บ่อยในสุนัขสูงวัย </p>
              </div>
              <a
                  href="#"
                  class="text-subtitle linking text-decoration-none d-flex align-center"
                  style="margin-top: 12px;"
                >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
                </a>
            </v-card>
          </v-col>

           <!-- ------------------------------------card -------------------------------------------------------- -->
           <v-col cols="12" md="3" sm="6">
            <v-card elevation="0" class="team-card  mb-7">
              <div class="overflow-hidden">
                <img src="/images/testimonial/พยาธิศัตรูตัวร้ายของน้องหมา.png" class="img-fluid"/>
              </div>
              <div>
                <h5 class="title">
                  พยาธิศัตรูตัวร้ายของน้องหมา
                </h5>
                <p class="subtitle">“พยาธิ” ศัตรูตัวร้ายของน้องหมาอีกหนึ่งปัญหา </p>
              </div>
              <a
                  href="#"
                  class="text-subtitle linking text-decoration-none d-flex align-center "
                  style="margin-top: 12px;"
                >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
                </a>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Team
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>

<style>
.title{
  font-family: "Prompt", sans-serif;
  color:#E97931;
  font-size: 16px;
  font-weight: 500;
}
.subtitle {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 14px;
  font-weight: 400;
}
.text-subtitle {
  font-family: "Prompt", sans-serif;
  color: #E97931;
  font-size: 14px;
  font-weight: 400;
}
</style>
