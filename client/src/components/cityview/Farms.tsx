/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 --types --keepnames --keepgroups --keepmeshes --transform --precision 6 public/models/farms.glb 
Files: public/models/farms.glb [121.14KB] > farms-transformed.glb [83.22KB] (31%)
*/
// @ts-nocheck
import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useRealmStore from "../../hooks/store/useRealmStore";
import { useDojo } from "../../DojoContext";
import { useComponentValue } from "@dojoengine/react";
import { LABOR_CONFIG, ResourcesIds } from "@bibliothecadao/eternum";
import useBlockchainStore from "../../hooks/store/useBlockchainStore";

type GLTFResult = GLTF & {
  nodes: {
    ["crop-11"]: THREE.Mesh;
    ["crop-12"]: THREE.Mesh;
    ["crop-13"]: THREE.Mesh;
    ["crop-14"]: THREE.Mesh;
    ["crop-15"]: THREE.Mesh;
    ["crop-16"]: THREE.Mesh;
    ["crop-17"]: THREE.Mesh;
    ["crop-18"]: THREE.Mesh;
    ["crop-19"]: THREE.Mesh;
    ["crop-20"]: THREE.Mesh;
    ["crop-1"]: THREE.Mesh;
    ["crop-2"]: THREE.Mesh;
    ["crop-3"]: THREE.Mesh;
    ["crop-4"]: THREE.Mesh;
    ["crop-5"]: THREE.Mesh;
    ["crop-6"]: THREE.Mesh;
    ["crop-7"]: THREE.Mesh;
    ["crop-8"]: THREE.Mesh;
    ["crop-9"]: THREE.Mesh;
    ["crop-10"]: THREE.Mesh;
    ["crop-21"]: THREE.Mesh;
    ["crop-22"]: THREE.Mesh;
    ["crop-23"]: THREE.Mesh;
    ["crop-24"]: THREE.Mesh;
    ["crop-25"]: THREE.Mesh;
    ["crop-26"]: THREE.Mesh;
    ["crop-27"]: THREE.Mesh;
    ["crop-28"]: THREE.Mesh;
    ["crop-29"]: THREE.Mesh;
    ["crop-30"]: THREE.Mesh;
    ["crop-31"]: THREE.Mesh;
    ["crop-32"]: THREE.Mesh;
    ["crop-33"]: THREE.Mesh;
    ["crop-34"]: THREE.Mesh;
    ["crop-35"]: THREE.Mesh;
    ["crop-36"]: THREE.Mesh;
    ["crop-37"]: THREE.Mesh;
    ["crop-38"]: THREE.Mesh;
    ["crop-39"]: THREE.Mesh;
    ["crop-40"]: THREE.Mesh;
    ["crop-41"]: THREE.Mesh;
    ["crop-42"]: THREE.Mesh;
    ["crop-43"]: THREE.Mesh;
    ["crop-44"]: THREE.Mesh;
    ["crop-45"]: THREE.Mesh;
    ["crop-46"]: THREE.Mesh;
    ["crop-47"]: THREE.Mesh;
    ["crop-48"]: THREE.Mesh;
    ["crop-49"]: THREE.Mesh;
    ["crop-50"]: THREE.Mesh;
    ["crop-51"]: THREE.Mesh;
    ["crop-52"]: THREE.Mesh;
    ["crop-53"]: THREE.Mesh;
    ["crop-54"]: THREE.Mesh;
    ["crop-55"]: THREE.Mesh;
    ["crop-56"]: THREE.Mesh;
    ["crop-57"]: THREE.Mesh;
    ["crop-58"]: THREE.Mesh;
    ["crop-59"]: THREE.Mesh;
    ["crop-60"]: THREE.Mesh;
    terrain001: THREE.Mesh;
    terrain001_1: THREE.Mesh;
    terrain001_2: THREE.Mesh;
    stems: THREE.Mesh;
  };
  materials: {
    ["Crop Fruit"]: THREE.MeshStandardMaterial;
    ["Road Dirt"]: THREE.MeshStandardMaterial;
    Grass: THREE.MeshStandardMaterial;
    Dirt: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>>;

const MAX_FARMS = 4;

function Farms(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/farms-transformed.glb") as GLTFResult;
  let { realmEntityId } = useRealmStore();

  const {
    setup: {
      components: { Labor },
    },
  } = useDojo();

  const labor = useComponentValue(Labor, getEntityIdFromKeys([BigInt(realmEntityId), BigInt(ResourcesIds["Wheat"])]));
  const nextBlockTimestamp = useBlockchainStore((state) => state.nextBlockTimestamp);

  const laborLeft = useMemo(() => {
    if (nextBlockTimestamp && labor && LABOR_CONFIG && labor.balance > nextBlockTimestamp) {
      let left = labor.balance - nextBlockTimestamp;
      return left < LABOR_CONFIG.base_labor_units ? 0 : left;
    }
    return 0;
  }, [nextBlockTimestamp, labor]);

  const farmsCount = useMemo(() => {
    if (!labor || laborLeft <= 0) {
      return 0;
    }
    return labor.multiplier;
  }, [laborLeft, labor]);

  return (
    <group {...props} dispose={null}>
      {farmsCount >= 1 && (
        <group name="quarter">
          <mesh
            name="crop-1"
            geometry={nodes["crop-1"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-2"
            geometry={nodes["crop-2"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-3"
            geometry={nodes["crop-3"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-4"
            geometry={nodes["crop-4"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-5"
            geometry={nodes["crop-5"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-6"
            geometry={nodes["crop-6"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-7"
            geometry={nodes["crop-7"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-8"
            geometry={nodes["crop-8"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-9"
            geometry={nodes["crop-9"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-10"
            geometry={nodes["crop-10"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-11"
            geometry={nodes["crop-11"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-12"
            geometry={nodes["crop-12"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-13"
            geometry={nodes["crop-13"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-14"
            geometry={nodes["crop-14"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-15"
            geometry={nodes["crop-15"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
        </group>
      )}
      {farmsCount >= 2 && (
        <group name="two-quarters">
          <mesh
            name="crop-16"
            geometry={nodes["crop-16"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-17"
            geometry={nodes["crop-17"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-18"
            geometry={nodes["crop-18"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-19"
            geometry={nodes["crop-19"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-20"
            geometry={nodes["crop-20"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-21"
            geometry={nodes["crop-21"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-22"
            geometry={nodes["crop-22"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-23"
            geometry={nodes["crop-23"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-24"
            geometry={nodes["crop-24"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-25"
            geometry={nodes["crop-25"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-26"
            geometry={nodes["crop-26"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-27"
            geometry={nodes["crop-27"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-28"
            geometry={nodes["crop-28"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-29"
            geometry={nodes["crop-29"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-30"
            geometry={nodes["crop-30"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
        </group>
      )}
      {farmsCount >= 3 && (
        <group name="three-quarters">
          <mesh
            name="crop-31"
            geometry={nodes["crop-31"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-32"
            geometry={nodes["crop-32"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-33"
            geometry={nodes["crop-33"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-34"
            geometry={nodes["crop-34"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-35"
            geometry={nodes["crop-35"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-36"
            geometry={nodes["crop-36"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-37"
            geometry={nodes["crop-37"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-38"
            geometry={nodes["crop-38"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-39"
            geometry={nodes["crop-39"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-40"
            geometry={nodes["crop-40"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-41"
            geometry={nodes["crop-41"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-42"
            geometry={nodes["crop-42"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-43"
            geometry={nodes["crop-43"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-44"
            geometry={nodes["crop-44"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
          <mesh
            name="crop-45"
            geometry={nodes["crop-45"].geometry}
            material={materials["Crop Fruit"]}
            position={[-209.282944, 0, -42.59145]}
          />
        </group>
      )}
      {farmsCount >= 4 && (
        <>
          <group name="four-quarters">
            <mesh
              name="crop-46"
              geometry={nodes["crop-46"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-47"
              geometry={nodes["crop-47"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-48"
              geometry={nodes["crop-48"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-49"
              geometry={nodes["crop-49"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-50"
              geometry={nodes["crop-50"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-51"
              geometry={nodes["crop-51"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-52"
              geometry={nodes["crop-52"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-53"
              geometry={nodes["crop-53"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-54"
              geometry={nodes["crop-54"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-55"
              geometry={nodes["crop-55"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-56"
              geometry={nodes["crop-56"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-57"
              geometry={nodes["crop-57"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-58"
              geometry={nodes["crop-58"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-59"
              geometry={nodes["crop-59"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <mesh
              name="crop-60"
              geometry={nodes["crop-60"].geometry}
              material={materials["Crop Fruit"]}
              position={[-209.282944, 0, -42.59145]}
            />
            <group name="floor_farm" position={[0, -0.002192, 0]}>
              <mesh name="terrain001" geometry={nodes.terrain001.geometry} material={materials["Road Dirt"]} />
              <mesh name="terrain001_1" geometry={nodes.terrain001_1.geometry} material={materials.Grass} />
              <mesh name="terrain001_2" geometry={nodes.terrain001_2.geometry} material={materials.Dirt} />
            </group>
          </group>
          <instancedMesh
            args={[nodes.stems.geometry, materials["Crop Fruit"], 143]}
            name="stems"
            instanceMatrix={nodes.stems.instanceMatrix}
          />
        </>
      )}
    </group>
  );
}

useGLTF.preload("/models/farms-transformed.glb");

export default Farms;
