import { useEffect, useMemo } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { EffectComposer, RenderPass } from 'postprocessing'
import { BloomEffect, VignetteEffect, EffectPass } from 'postprocessing'

extend({ EffectComposer, RenderPass, EffectPass })

export default function Effects() {
  const { gl, scene, camera, size } = useThree()
  
  const composer = useMemo(() => {
    const effectComposer = new EffectComposer(gl)
    effectComposer.addPass(new RenderPass(scene, camera))
    
    const bloomEffect = new BloomEffect({
      intensity: 2.0,
      luminanceThreshold: 0.15,
      luminanceSmoothing: 0.9,
      radius: 1.0
    })
    
    const vignetteEffect = new VignetteEffect({
      offset: 0.25,
      darkness: 0.8
    })
    
    const effectPass = new EffectPass(camera, bloomEffect, vignetteEffect)
    effectComposer.addPass(effectPass)
    
    return effectComposer
  }, [gl, scene, camera])
  
  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])
  
  useFrame(() => {
    composer.render()
  }, 1)
  
  return null
}
