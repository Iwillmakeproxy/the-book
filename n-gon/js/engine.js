const Engine=Matter.Engine,Events=Matter.Events,Composites=Matter.Composites,Composite=Matter.Composite,Constraint=Matter.Constraint,Vertices=Matter.Vertices,Query=Matter.Query,Body=Matter.Body,Bodies=Matter.Bodies,Vector=Matter.Vector,engine=Engine.create();function playerOnGroundCheck(e){function o(){if(m.numTouching++,!m.onGround)if(m.onGround=!0,m.crouch)m.checkHeadClear()?m.undoCrouch():m.yOffGoal=m.yOffWhen.crouch;else{const e=player.velocity.y*player.mass;e>130?(m.doCrouch(),m.yOff=m.yOffWhen.jump,m.hardLandCD=m.cycle+Math.min(e/6.5-6,40),tech.isFallingDamage&&m.immuneCycle<m.cycle&&e>150&&(m.damage(Math.min(.01*Math.sqrt(e-133),.25)),m.immuneCycle<m.cycle+tech.collisionImmuneCycles&&(m.immuneCycle=m.cycle+tech.collisionImmuneCycles))):m.yOffGoal=m.yOffWhen.stand}}const t=e.pairs;for(let e=0,i=t.length;e!=i;++e){let i=t[e];i.bodyA===jumpSensor?(m.standingOn=i.bodyB,!0!==m.standingOn.alive&&o()):i.bodyB===jumpSensor&&(m.standingOn=i.bodyA,!0!==m.standingOn.alive&&o())}m.numTouching=0}function playerOffGroundCheck(e){const o=e.pairs;for(let e=0,t=o.length;e!=t;++e)o[e].bodyA!==jumpSensor&&o[e].bodyB!==jumpSensor||m.onGround&&0===m.numTouching&&(m.onGround=!1,m.hardLandCD=0,m.checkHeadClear()&&(m.crouch&&m.undoCrouch(),m.yOffGoal=m.yOffWhen.jump))}function collisionChecks(e){const o=e.pairs;for(let e=0,i=o.length;e!=i;e++)for(let i=0;i<mob.length;i++)if(mob[i].alive){if(o[e].bodyA===mob[i]){t(o[e].bodyB);break}if(o[e].bodyB===mob[i]){t(o[e].bodyA);break}function t(t){if(!(m.immuneCycle<m.cycle)||t!==playerBody&&t!==playerHead||mob[i].isSlowed||mob[i].isStunned){if("bullet"===t.classType&&t.speed>t.minDmgSpeed){t.beforeDmg(mob[i]);let m=b.dmgScale*(t.dmg+.15*t.mass*Vector.magnitude(Vector.sub(mob[i].velocity,t.velocity)));return tech.isCrit&&mob[i].isStunned&&(m*=4),mob[i].damage(m),mob[i].alive&&mob[i].foundPlayer(),mob[i].damageReduction&&simulation.drawList.push({x:o[e].activeContacts[0].vertex.x,y:o[e].activeContacts[0].vertex.y,radius:40*Math.log(m+1.1)*mob[i].damageReduction+3,color:simulation.playerDmgColor,time:simulation.drawTime}),void(tech.isLessDamageReduction&&!mob[i].shield&&(mob[i].damageReduction*=mob[i].isBoss?1.01:1.06))}if("body"===t.classType&&t.speed>6){const n=Vector.magnitude(Vector.sub(mob[i].velocity,t.velocity));if(n>9){let a=tech.blockDamage*b.dmgScale*n*t.mass*(tech.isMobBlockFling?2.5:1)*(tech.isBlockRestitution?2.5:1);if(mob[i].isShielded&&(a*=.7),mob[i].damage(a,!0),tech.isBlockPowerUps&&!mob[i].alive&&mob[i].isDropPowerUp&&m.throwCycle>m.cycle){let e=tech.isEnergyNoAmmo?"heal":"ammo";Math.random()<.4?e="heal":Math.random()<.4&&!tech.isSuperDeterminism&&(e="research"),powerUps.spawn(mob[i].position.x,mob[i].position.y,e)}const s=a/Math.sqrt(t.mass);return s>.5&&mobs.statusStun(mob[i],60+60*Math.sqrt(s)),mob[i].alive&&mob[i].distanceToPlayer2()<1e6&&!m.isCloak&&mob[i].foundPlayer(),tech.fragments&&t.speed>10&&!t.hasFragmented&&(t.hasFragmented=!0,b.targetedNail(t.position,4*tech.fragments)),void(mob[i].damageReduction&&simulation.drawList.push({x:o[e].activeContacts[0].vertex.x,y:o[e].activeContacts[0].vertex.y,radius:40*Math.log(a+1.1)*mob[i].damageReduction+3,color:simulation.playerDmgColor,time:simulation.drawTime}))}}}else{let t=Math.min(Math.max(.025*Math.sqrt(mob[i].mass),.05),.3)*simulation.dmgScale;if(m.isCloak&&(t*=.5),mob[i].foundPlayer(),tech.isRewindAvoidDeath&&m.energy>.66)return void m.damage(t);tech.isFlipFlop?tech.isFlipFlopOn?(tech.isFlipFlopOn=!1,document.getElementById("tech-flip-flop")&&(document.getElementById("tech-flip-flop").innerHTML=" = <strong>OFF</strong>"),m.eyeFillColor="transparent",tech.isFlipFlopHarm||m.damage(t)):(tech.isFlipFlopOn=!0,document.getElementById("tech-flip-flop")&&(document.getElementById("tech-flip-flop").innerHTML=" = <strong>ON</strong>"),m.eyeFillColor=m.fieldMeterColor,m.damage(t)):m.damage(t),tech.isCollisionRealitySwitch&&(m.switchWorlds(),simulation.trails(),simulation.makeTextLog(`simulation.amplitude <span class='color-symbol'>=</span> ${Math.random()}`)),tech.isPiezo&&(m.energy+=20.48),tech.isStimulatedEmission&&powerUps.ejectTech(),mob[i].onHit&&mob[i].onHit(i),m.immuneCycle<m.cycle+tech.collisionImmuneCycles&&(m.immuneCycle=m.cycle+tech.collisionImmuneCycles);let n=Math.atan2(player.position.y-mob[i].position.y,player.position.x-mob[i].position.x);Matter.Body.setVelocity(player,{x:player.velocity.x+8*Math.cos(n),y:player.velocity.y+8*Math.sin(n)}),Matter.Body.setVelocity(mob[i],{x:mob[i].velocity.x-8*Math.cos(n),y:mob[i].velocity.y-8*Math.sin(n)}),tech.isAnnihilation&&!mob[i].shield&&!mob[i].isShielded&&!mob[i].isBoss&&mob[i].isDropPowerUp&&m.energy>.34*m.maxEnergy?(m.energy-=.33*Math.max(m.maxEnergy,m.energy),m.immuneCycle===m.cycle+tech.collisionImmuneCycles&&(m.immuneCycle=0),mob[i].death(),simulation.drawList.push({x:o[e].activeContacts[0].vertex.x,y:o[e].activeContacts[0].vertex.y,radius:500*Math.sqrt(t),color:"rgba(255,0,255,0.2)",time:simulation.drawTime})):simulation.drawList.push({x:o[e].activeContacts[0].vertex.x,y:o[e].activeContacts[0].vertex.y,radius:200*Math.sqrt(t),color:simulation.mobDmgColor,time:simulation.drawTime})}}}}engine.world.gravity.scale=0,Events.on(engine,"collisionStart",(function(e){playerOnGroundCheck(e),m.alive&&collisionChecks(e)})),Events.on(engine,"collisionActive",(function(e){playerOnGroundCheck(e)})),Events.on(engine,"collisionEnd",(function(e){playerOffGroundCheck(e)}));
