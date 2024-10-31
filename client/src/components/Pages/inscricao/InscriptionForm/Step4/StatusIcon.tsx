import AnimatedComponent from "@/components/common/AnimatedComponent";
import { IconPack } from "@/components/common/IconPack";
import Image from "next/image";

export const StatusIcon = ({ isAllowed }: { isAllowed: boolean }) => (
    <AnimatedComponent>
        {isAllowed ? (
            <IconPack.Done className="mx-auto" />
        ) : (
            <Image
                src="/assets/images/message.png"
                alt="Inscrição não foi concluída"
                className="mx-auto w-36"
                width={512}
                height={512}
            />
        )}
    </AnimatedComponent>
);
