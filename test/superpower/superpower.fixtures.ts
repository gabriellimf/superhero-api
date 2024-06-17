import { CreateSuperpowerDto } from 'src/superpower/dto/create-hero-power.dto';
import { SuperpowerService } from 'src/superpower/superpower.service';

const superPowerFixture = async (service: SuperpowerService) => {
  const validAttrs: CreateSuperpowerDto = {
    power_name: 'Super strength',
  };
  return await service.create(validAttrs);
};

export { superPowerFixture };
