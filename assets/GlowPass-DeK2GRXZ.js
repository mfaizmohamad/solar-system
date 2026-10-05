var x=Object.defineProperty;var C=(c,l,e)=>l in c?x(c,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[l]=e;var a=(c,l,e)=>C(c,typeof l!="symbol"?l+"":l,e);import{P as q,F as T}from"./Pass-DyPpMLOv.js";import{O as b,d as E}from"./SolarSystemApp-CmL6U6m4.js";import{a4 as g,L as v,a5 as S,b as M,g as n,e as d,h as F,a7 as R,a8 as k,a9 as U,aa as y,C as D}from"./three-B1lhCMq6.js";import"./tween-Cs9c6a_y.js";import"./astronomy-CluaFNti.js";const h=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,A=`
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uKaris;
uniform float uThreshold;
uniform float uKnee;
uniform float uPrefilter;
varying vec2 vUv;
// Seuil à genou doux (Unreal Engine 4) : la part au-delà du seuil passe entière, une rampe
// quadratique raccorde en douceur — pas de liseré autour de ce qui franchit tout juste.
vec3 prefilter(vec3 c) {
  float brightness = max(c.r, max(c.g, c.b));
  float soft = clamp(brightness - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  soft = soft * soft / (4.0 * uKnee + 1e-5);
  float contribution = max(soft, brightness - uThreshold) / max(brightness, 1e-5);
  return c * contribution;
}
vec3 tap(vec2 offset) {
  vec3 c = texture2D(uSource, vUv + offset * uTexel).rgb;
  return uPrefilter > 0.5 ? prefilter(c) : c;
}
float karisWeight(vec3 c) {
  return mix(1.0, 1.0 / (1.0 + dot(c, vec3(0.2126, 0.7152, 0.0722))), uKaris);
}
void main() {
  vec3 a = tap(vec2(-2.0, 2.0));
  vec3 b = tap(vec2(0.0, 2.0));
  vec3 c = tap(vec2(2.0, 2.0));
  vec3 d = tap(vec2(-2.0, 0.0));
  vec3 e = tap(vec2(0.0, 0.0));
  vec3 f = tap(vec2(2.0, 0.0));
  vec3 g = tap(vec2(-2.0, -2.0));
  vec3 h = tap(vec2(0.0, -2.0));
  vec3 i = tap(vec2(2.0, -2.0));
  vec3 j = tap(vec2(-1.0, 1.0));
  vec3 k = tap(vec2(1.0, 1.0));
  vec3 l = tap(vec2(-1.0, -1.0));
  vec3 m = tap(vec2(1.0, -1.0));
  // Cinq sous-carrés 2×2, pondérés 0,5 (centre) et 0,125 (coins), comme chez Jimenez.
  vec3 q0 = (j + k + l + m) * 0.25;
  vec3 q1 = (a + b + d + e) * 0.25;
  vec3 q2 = (b + c + e + f) * 0.25;
  vec3 q3 = (d + e + g + h) * 0.25;
  vec3 q4 = (e + f + h + i) * 0.25;
  float w0 = 0.5 * karisWeight(q0);
  float w1 = 0.125 * karisWeight(q1);
  float w2 = 0.125 * karisWeight(q2);
  float w3 = 0.125 * karisWeight(q3);
  float w4 = 0.125 * karisWeight(q4);
  vec3 sum = q0 * w0 + q1 * w1 + q2 * w2 + q3 * w3 + q4 * w4;
  gl_FragColor = vec4(sum / (w0 + w1 + w2 + w3 + w4), 1.0);
}`,P=`
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uRadius;
varying vec2 vUv;
vec3 tap(vec2 offset) {
  return texture2D(uSource, vUv + offset * uTexel * uRadius).rgb;
}
void main() {
  vec3 sum = tap(vec2(0.0, 0.0)) * 4.0;
  sum += (tap(vec2(0.0, 1.0)) + tap(vec2(-1.0, 0.0)) + tap(vec2(1.0, 0.0)) + tap(vec2(0.0, -1.0))) * 2.0;
  sum += tap(vec2(-1.0, 1.0)) + tap(vec2(1.0, 1.0)) + tap(vec2(-1.0, -1.0)) + tap(vec2(1.0, -1.0));
  gl_FragColor = vec4(sum / 16.0, 1.0);
}`,W=`
uniform float uScale;
void main() {
  gl_FragColor = vec4(vec3(uScale), 1.0);
}`,_=`
uniform sampler2D uScene;
uniform sampler2D uGlow;
uniform sampler2D uSelection;
uniform float uStrength;
varying vec2 vUv;
void main() {
  vec4 base = texture2D(uScene, vUv);
  float source = dot(texture2D(uSelection, vUv).rgb, vec3(0.2126, 0.7152, 0.0722));
  vec3 glow = texture2D(uGlow, vUv).rgb * uStrength / (1.0 + 4.0 * source);
  gl_FragColor = vec4(base.rgb + glow, base.a);
}`;function G(){return new g(1,1,{type:S,minFilter:v,magFilter:v,depthBuffer:!1})}class j extends q{constructor(e,r,s){super();a(this,"settings");a(this,"selection",new g(1,1,{type:S,minFilter:v,magFilter:v}));a(this,"mips",[]);a(this,"quad",new T);a(this,"occluderMaterial",new M({color:0}));a(this,"downsample",new n({uniforms:{uSource:{value:null},uTexel:{value:new d},uKaris:{value:0},uThreshold:{value:1},uKnee:{value:.5},uPrefilter:{value:0}},vertexShader:h,fragmentShader:A,depthTest:!1,depthWrite:!1}));a(this,"upsample",new n({uniforms:{uSource:{value:null},uTexel:{value:new d},uRadius:{value:1}},vertexShader:h,fragmentShader:P,blending:F,depthTest:!1,depthWrite:!1}));a(this,"composite",new n({uniforms:{uScene:{value:null},uGlow:{value:null},uSelection:{value:null},uStrength:{value:1}},vertexShader:h,fragmentShader:_,depthTest:!1,depthWrite:!1}));a(this,"scale",new n({uniforms:{uScale:{value:1}},vertexShader:h,fragmentShader:W,blending:y,blendEquation:U,blendSrc:k,blendDst:R,depthTest:!1,depthWrite:!1}));a(this,"clearColor",new D);this.scene=e,this.camera=r,this.settings={...s};for(let t=0;t<Math.max(1,s.levels);t++)this.mips.push(G())}setSize(e,r){const s=(t,u)=>Math.max(1,Math.floor(t/u));this.selection.setSize(s(e,2),s(r,2)),this.mips.forEach((t,u)=>t.setSize(s(e,2**(u+2)),s(r,2**(u+2))))}render(e,r,s){this.renderSelection(e);let t=this.selection;this.quad.material=this.downsample,this.mips.forEach((i,o)=>{this.downsample.uniforms.uSource.value=t.texture,this.downsample.uniforms.uTexel.value.set(1/t.width,1/t.height),this.downsample.uniforms.uKaris.value=o===0?1:0,this.downsample.uniforms.uPrefilter.value=o===0?1:0,this.downsample.uniforms.uThreshold.value=this.settings.threshold,this.downsample.uniforms.uKnee.value=this.settings.knee,e.setRenderTarget(i),this.quad.render(e),t=i}),this.quad.material=this.upsample,this.upsample.uniforms.uRadius.value=this.settings.radius;const u=e.autoClear;e.autoClear=!1;for(let i=this.mips.length-1;i>0;i--){const o=this.mips[i];this.upsample.uniforms.uSource.value=o.texture,this.upsample.uniforms.uTexel.value.set(1/o.width,1/o.height),e.setRenderTarget(this.mips[i-1]),this.quad.render(e)}e.autoClear=u,this.quad.material=this.composite,this.composite.uniforms.uScene.value=s.texture,this.composite.uniforms.uGlow.value=this.mips[0].texture,this.composite.uniforms.uSelection.value=this.selection.texture,this.composite.uniforms.uStrength.value=this.settings.strength,e.setRenderTarget(this.renderToScreen?null:r),this.quad.render(e)}renderSelection(e){const r=this.scene.background,s=this.scene.overrideMaterial,t=this.camera.layers.mask,u=e.autoClear;e.getClearColor(this.clearColor);const i=e.getClearAlpha();this.scene.background=null,e.setRenderTarget(this.selection),e.setClearColor(0,1),e.clear(),e.autoClear=!1,this.camera.layers.set(b),this.scene.overrideMaterial=this.occluderMaterial,e.render(this.scene,this.camera),this.scene.overrideMaterial=null;const o=E();o.forEach((m,w)=>{this.camera.layers.set(m.layer),e.render(this.scene,this.camera);const p=o[w+1],f=p?m.gain/p.gain:m.gain;f!==1&&(this.scale.uniforms.uScale.value=f,this.quad.material=this.scale,this.quad.render(e))}),this.camera.layers.mask=t,this.scene.overrideMaterial=s,this.scene.background=r,e.autoClear=u,e.setClearColor(this.clearColor,i)}dispose(){this.selection.dispose(),this.mips.forEach(e=>e.dispose()),this.quad.dispose(),this.occluderMaterial.dispose(),this.downsample.dispose(),this.upsample.dispose(),this.composite.dispose(),this.scale.dispose()}}export{_ as COMPOSITE_FRAGMENT,A as DOWNSAMPLE_FRAGMENT,j as GlowPass,W as SCALE_FRAGMENT,P as UPSAMPLE_FRAGMENT};
