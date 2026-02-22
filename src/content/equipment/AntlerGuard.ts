import { Offhand } from "../../sdk/gear/Offhand";
import { ImageLoader } from "../../sdk/utils/ImageLoader";
import { Assets } from "../../sdk/utils/Assets";
import InventImage from "../../assets/images/equipment/Antler_guard.png";
import { ItemName } from "../../sdk/ItemName";

export class AntlerGuard extends Offhand {
  inventorySprite: HTMLImageElement = ImageLoader.createImage(this.inventoryImage);

  get inventoryImage() {
    return InventImage;
  }
  get itemName(): ItemName {
    return ItemName.ANTLER_GUARD;
  }
  get weight(): number {
    return 0.453;
  }

  Model = Assets.getAssetUrl("models/player_avernic_defender.glb");
  override get model() {
    return this.Model;
  }

  constructor() {
    super();
    this.bonuses = {
      attack: {
        stab: 15,
        slash: 15,
        crush: 15,
        magic: 9,
        range: 9,
      },
      defence: {
        stab: -15,
        slash: -15,
        crush: -15,
        magic: -15,
        range: -15,
      },
      other: {
        meleeStrength: 5,
        rangedStrength: 2,
        magicDamage: 0,
        prayer: 5,
      },
      targetSpecific: {
        undead: 0,
        slayer: 0,
      },
    };
  }
}
