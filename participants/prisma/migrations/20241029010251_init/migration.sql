-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "IDCode" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "emergencyName" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "emergencyFamiliarity" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "shirt" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_IDCode_key" ON "Participant"("IDCode");

-- CreateIndex
CREATE INDEX "Participant_IDCode_email_phone_idx" ON "Participant"("IDCode", "email", "phone");
